const jsonHeaders = { 'Content-Type': 'application/json' }

export async function fetchUsers() {
  const r = await fetch('/api/users')
  if (!r.ok) throw new Error('Failed to fetch users')
  return r.json()
}

export async function createUser(payload) {
  const r = await fetch('/api/users', { method: 'POST', headers: jsonHeaders, body: JSON.stringify(payload) })
  if (!r.ok) {
    const j = await r.json().catch(() => ({}))
    throw new Error(j.description || 'Create failed')
  }
  return r.json()
}

export async function updateUser(id, payload) {
  const r = await fetch(`/api/users/${id}`, { method: 'PUT', headers: jsonHeaders, body: JSON.stringify(payload) })
  if (!r.ok) {
    const j = await r.json().catch(() => ({}))
    throw new Error(j.description || 'Update failed')
  }
  return r.json()
}

export async function deleteUser(id) {
  const r = await fetch(`/api/users/${id}`, { method: 'DELETE' })
  if (!r.ok) throw new Error('Delete failed')
  return r.json()
}

export default { fetchUsers, createUser, updateUser, deleteUser }
