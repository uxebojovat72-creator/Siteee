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

  // Honeypot: bots fill this field, real users don't
  if (body.hp) return json({ status: 'ok' }, 201)

  const message = (body.message || '').trim()
  if (message.length < 2) return json({ status: 'error' }, 400)

  // Simple IP rate-limit via KV (optional — skip if no KV binding)
  const ip =
    request.headers.get('CF-Connecting-IP') ||
    request.headers.get('X-Forwarded-For') ||
    'unknown'

  if (env.CHAT_KV) {
    const key = `rl:${ip}`
    const count = parseInt((await env.CHAT_KV.get(key)) || '0', 10)
    if (count >= 10) return json({ status: 'error', code: 'rate_limit' }, 429)
    await env.CHAT_KV.put(key, String(count + 1), { expirationTtl: 3600 })
  }

  // Send Telegram notification
  const token = env.TELEGRAM_BOT_TOKEN
  const chatId = env.TELEGRAM_CHAT_ID

  if (token && chatId) {
    const name = (body.name || '').trim()
    const phone = (body.phone || '').trim()

    let text = '💬 *Новое сообщение с сайта*\n\n'
    if (name) text += `👤 ${escMd(name)}\n`
    if (phone) text += `📱 ${escMd(phone)}\n`
    text += `\n_${escMd(message)}_\n\n🌐 paintballclub\\.ru`

    try {
      await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ chat_id: chatId, text, parse_mode: 'MarkdownV2' }),
      })
    } catch {
      // Telegram down — still return ok so user isn't confused
    }
  }

  return json({ status: 'ok' }, 201)
}

function escMd(str) {
  return String(str).replace(/[_*[\]()~`>#+\-=|{}.!\\]/g, '\\$&')
}
