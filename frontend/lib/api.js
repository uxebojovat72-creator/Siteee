const API_URL = process.env.API_URL || process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'

export async function fetchParks() {
  const res = await fetch(`${API_URL}/api/parks/`, { next: { revalidate: 60 } })
  if (!res.ok) return []
  return res.json()
}

export async function fetchPark(slug) {
  const res = await fetch(`${API_URL}/api/parks/${slug}/`, { next: { revalidate: 60 } })
  if (!res.ok) return null
  return res.json()
}

export async function createBooking(data) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL || API_URL}/api/bookings/`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    }
  )
  return { ok: res.ok, data: await res.json() }
}
