// Telegram webhook — receives manager replies and saves them to the user's chat session
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

  // Append manager reply to the session
  const raw = await env.CHAT_KV.get(`session:${sessionId}`)
  const messages = raw ? JSON.parse(raw) : []
  messages.push({ type: 'out', text: replyText, ts: Date.now() })
  await env.CHAT_KV.put(`session:${sessionId}`, JSON.stringify(messages), {
    expirationTtl: 86400,
  })

  // Also map the manager's reply message_id → session
  // so if they reply AGAIN to THEIR OWN message, it still routes correctly
  if (msg.message_id) {
    await env.CHAT_KV.put(`tg_msg:${msg.message_id}`, sessionId, {
      expirationTtl: 86400,
    })
  }

  return new Response('ok')
}

export async function onRequestGet() {
  return new Response('Webhook active', { status: 200 })
}
