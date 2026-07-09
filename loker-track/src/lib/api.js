const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000/api'

async function request(path, options = {}) {
  let res
  try {
    res = await fetch(`${API_URL}${path}`, {
      headers: { 'Content-Type': 'application/json' },
      ...options,
    })
  } catch (err) {
    throw new Error(
      `Tidak bisa menghubungi server di ${API_URL}. Pastikan backend sudah jalan (npm run dev di folder backend).`,
    )
  }

  if (!res.ok) {
    const body = await res.json().catch(() => ({}))
    throw new Error(body.error || `Request gagal (${res.status})`)
  }

  if (res.status === 204) return null
  return res.json()
}

export const api = {
  listJobs: (params = {}) => {
    const clean = Object.fromEntries(Object.entries(params).filter(([, v]) => v))
    const qs = new URLSearchParams(clean).toString()
    return request(`/jobs${qs ? `?${qs}` : ''}`)
  },
  createJob: (data) => request('/jobs', { method: 'POST', body: JSON.stringify(data) }),
  updateJob: (id, data) => request(`/jobs/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  deleteJob: (id) => request(`/jobs/${id}`, { method: 'DELETE' }),
}
