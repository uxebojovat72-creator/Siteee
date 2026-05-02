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

  const sessionId =
    body.session_id && /^[0-9a-f-]{36}$/.test(body.session_id)
      ? body.session_id
      : crypto.randomUUID()

  const name = (body.name || '').trim()
  const phone = (body.phone || '').trim()
  const isFirst = !body.session_id
  const shortId = sessionId.slice(0, 6)

  // IP and geo from Cloudflare headers
  const ip = request.headers.get('CF-Connecting-IP') || ''
  const city = request.cf?.city || ''
  const country = request.cf?.country || ''
  const geo = [city, country].filter(Boolean).join(', ')

  // Persist to KV
  if (env.CHAT_KV) {
    const rlKey = `rl:${ip || 'unknown'}`
    const count = parseInt((await env.CHAT_KV.get(rlKey)) || '0', 10)
    if (count >= 10) return json({ status: 'error', code: 'rate_limit' }, 429)
    await env.CHAT_KV.put(rlKey, String(count + 1), { expirationTtl: 3600 })

    const raw = await env.CHAT_KV.get(`session:${sessionId}`)
    const msgs = raw ? JSON.parse(raw) : []
    msgs.push({ type: 'in', text: message, ts: Date.now() })
    await env.CHAT_KV.put(`session:${sessionId}`, JSON.stringify(msgs), { expirationTtl: 86400 })

    if (isFirst) {
      await env.CHAT_KV.put(`meta:${sessionId}`, JSON.stringify({ name, phone, ip, geo }), { expirationTtl: 86400 })
    }
    await env.CHAT_KV.put(`lastseen:${sessionId}`, String(Date.now()), { expirationTtl: 86400 })
  }

  // Send to Telegram
  const token = env.TELEGRAM_BOT_TOKEN
  const chatId = env.TELEGRAM_CHAT_ID

  if (!token || !chatId) {
    console.error('[chat] Missing env vars: TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID')
  } else {
    let text = isFirst
      ? `💬 *Новый чат* · \`#${shortId}\`\n`
      : `↩️ *Продолжение* · \`#${shortId}\`\n`
    if (name) text += `👤 ${esc(name)}\n`
    if (phone) text += `📱 ${esc(phone)}\n`
    text += `\n_${esc(message)}_`
    if (ip || geo) text += `\n\n🌍 ${geo ? `${esc(geo)} · ` : ''}${esc(ip)}`

    try {
      const tgRes = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ chat_id: chatId, text, parse_mode: 'MarkdownV2' }),
      })
      const tgData = await tgRes.json()
      if (!tgData.ok) {
        console.error('[chat] Telegram error:', JSON.stringify(tgData))
      }

      if (tgData.ok && env.CHAT_KV) {
        await env.CHAT_KV.put(`tg_msg:${tgData.result.message_id}`, sessionId, { expirationTtl: 86400 })
      }
    } catch (e) {
      console.error('[chat] Telegram fetch failed:', e.message)
    }
  }

  return json({ status: 'ok', session_id: sessionId }, 201)
}

function esc(str) {
  return String(str).replace(/[_*[\]()~`>#+\-=|{}.!\\]/g, '\\$&')
}
