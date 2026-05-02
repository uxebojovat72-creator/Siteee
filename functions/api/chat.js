const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
}

function json(body, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...CORS, 'Content-Type': 'application/json' },
  })
}

export async function onRequestOptions() {
  return new Response(null, { status: 204, headers: CORS })
}

export async function onRequestPost({ request, env }) {
  let body
  try {
    body = await request.json()
  } catch {
    return json({ status: 'error' }, 400)
  }

  // Honeypot: bots fill this, real users don't
  if (body.hp) return json({ status: 'ok', session_id: crypto.randomUUID() }, 201)

  const message = (body.message || '').trim()
  if (message.length < 2) return json({ status: 'error' }, 400)

  // Use existing session or create new one
  const sessionId =
    body.session_id && /^[0-9a-f-]{36}$/.test(body.session_id)
      ? body.session_id
      : crypto.randomUUID()

  const name = (body.name || '').trim()
  const phone = (body.phone || '').trim()
  const isFirst = !body.session_id

  // Persist user message to KV
  if (env.CHAT_KV) {
    // IP rate-limit (10/hour)
    const ip = request.headers.get('CF-Connecting-IP') || 'unknown'
    const rlKey = `rl:${ip}`
    const count = parseInt((await env.CHAT_KV.get(rlKey)) || '0', 10)
    if (count >= 10) return json({ status: 'error', code: 'rate_limit' }, 429)
    await env.CHAT_KV.put(rlKey, String(count + 1), { expirationTtl: 3600 })

    // Save message
    const raw = await env.CHAT_KV.get(`session:${sessionId}`)
    const msgs = raw ? JSON.parse(raw) : []
    msgs.push({ type: 'in', text: message, ts: Date.now() })
    await env.CHAT_KV.put(`session:${sessionId}`, JSON.stringify(msgs), {
      expirationTtl: 86400,
    })
  }

  // Send to Telegram
  const token = env.TELEGRAM_BOT_TOKEN
  const chatId = env.TELEGRAM_CHAT_ID

  if (token && chatId) {
    let text = isFirst ? `💬 *Новый чат*\n` : `↩️ *Продолжение*\n`
    if (name) text += `👤 ${esc(name)}\n`
    if (phone) text += `📱 ${esc(phone)}\n`
    text += `\n_${esc(message)}_\n\n🌐 paintballclub\\.ru`

    try {
      const tgRes = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ chat_id: chatId, text, parse_mode: 'MarkdownV2' }),
      })
      const tgData = await tgRes.json()

      // Store TG message_id → session_id so webhook can route manager replies
      if (tgData.ok && env.CHAT_KV) {
        await env.CHAT_KV.put(`tg_msg:${tgData.result.message_id}`, sessionId, {
          expirationTtl: 86400,
        })
      }
    } catch {
      // Telegram down — still return ok
    }
  }

  return json({ status: 'ok', session_id: sessionId }, 201)
}

function esc(str) {
  return String(str).replace(/[_*[\]()~`>#+\-=|{}.!\\]/g, '\\$&')
}
