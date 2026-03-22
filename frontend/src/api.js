const JSON_HEADERS = { 'Content-Type': 'application/json' }

/** Empty in dev (Vite proxies /api). Set VITE_API_URL=http://127.0.0.1:8000 for preview or static hosting. */
const API_ROOT = (import.meta.env.VITE_API_URL || '').replace(/\/$/, '')

function apiUrl(path) {
  return `${API_ROOT}${path}`
}

async function parseJson(res) {
  const text = await res.text()
  if (!text) return null
  try {
    return JSON.parse(text)
  } catch {
    return text
  }
}

export async function registerTeammate(payload) {
  const res = await fetch(apiUrl('/api/register/'), {
    method: 'POST',
    headers: JSON_HEADERS,
    body: JSON.stringify(payload),
  })
  const data = await parseJson(res)
  if (!res.ok) {
    const msg =
      typeof data === 'object' && data !== null
        ? Object.values(data).flat().join(' ') || res.statusText
        : res.statusText
    throw new Error(msg)
  }
  return data
}

export async function fetchUsers() {
  const res = await fetch(apiUrl('/api/users/'))
  const data = await parseJson(res)
  if (!res.ok) throw new Error(res.statusText)
  return Array.isArray(data) ? data : data?.results ?? []
}

export async function searchBySkill(skill) {
  const q = new URLSearchParams()
  if (skill.trim()) q.set('skill', skill.trim())
  const res = await fetch(apiUrl(`/api/search/?${q.toString()}`))
  const data = await parseJson(res)
  if (!res.ok) throw new Error(res.statusText)
  return Array.isArray(data) ? data : data?.results ?? []
}
