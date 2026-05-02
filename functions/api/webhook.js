function esc(str) {
  return String(str).replace(/[_*[\]()~`>#+\-=|{}.!\\]/g, '\\$&')
}

async function tgSend(token, chatId, text) {
  await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ chat_id: chatId, text, parse_mode: 'MarkdownV2' }),
  }).catch(() => {})
}

export async function onRequestPost({ request, env }) {
  let update
  try {
    update = await request.json()
  } catch {
    return new Response('ok')
  }

  const msg = update.message
  // Only process text replies to a bot message
  if (!msg || !msg.text || !msg.reply_to_message || !env.CHAT_KV) {
    return new Response('ok')
  }

  const replyText = msg.text.trim()
  const originalMsgId = msg.reply_to_message.message_id

  // Find which site session this Telegram message belongs to
  const sessionId = await env.CHAT_KV.get(`tg_msg:${originalMsgId}`)
  if (!sessionId) return new Response('ok')

  // Check if user is currently online (last poll < 2 min ago)
  const lastSeenRaw = await env.CHAT_KV.get(`lastseen:${sessionId}`)
  const lastSeenTs = lastSeenRaw ? parseInt(lastSeenRaw) : 0
  const offlineMs = Date.now() - lastSeenTs
  const isOffline = !lastSeenTs || offlineMs > 120000

  // Save manager reply to session
  const raw = await env.CHAT_KV.get(`session:${sessionId}`)
  const messages = raw ? JSON.parse(raw) : []
  messages.push({ type: 'out', text: replyText, ts: Date.now() })
  await env.CHAT_KV.put(`session:${sessionId}`, JSON.stringify(messages), { expirationTtl: 86400 })

  // Map manager's reply message_id → session for chaining replies
  if (msg.message_id) {
    await env.CHAT_KV.put(`tg_msg:${msg.message_id}`, sessionId, { expirationTtl: 86400 })
  }

  // Notify manager if user is offline
  if (isOffline && env.TELEGRAM_BOT_TOKEN && env.TELEGRAM_CHAT_ID) {
    const mins = lastSeenTs ? Math.round(offlineMs / 60000) : null
    const offlineNote = mins
      ? `⚠️ Пользователь оффлайн — последняя активность ${mins} мин\\. назад\\. Ответ сохранён, увидит при следующем визите\\.`
      : `⚠️ Пользователь не открывал сайт в этом сеансе\\. Ответ сохранён\\.`
    await tgSend(env.TELEGRAM_BOT_TOKEN, env.TELEGRAM_CHAT_ID, offlineNote)
  }

  return new Response('ok')
}

export async function onRequestGet() {
  return new Response('Webhook active', { status: 200 })
}
