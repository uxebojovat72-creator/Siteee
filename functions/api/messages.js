const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
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

export async function onRequestGet({ request, env }) {
  const url = new URL(request.url)
  const sessionId = url.searchParams.get('session')

  if (!sessionId || !env.CHAT_KV) return json({ messages: [] })

  try {
    // Heartbeat — update lastSeen on every poll so manager knows user is online
    await env.CHAT_KV.put(`lastseen:${sessionId}`, String(Date.now()), { expirationTtl: 86400 })

    const raw = await env.CHAT_KV.get(`session:${sessionId}`)
    const messages = raw ? JSON.parse(raw) : []
    return json({ messages })
  } catch {
    return json({ messages: [] })
  }
}
