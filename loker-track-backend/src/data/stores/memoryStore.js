import { v4 as uuidv4 } from 'uuid'
import { SEED_JOBS } from '../seed.js'

// In-memory "table". Swap this file's internals for real SQL queries later —
// every function here keeps the same name and return shape a MySQL-backed
// version would use, so controllers never need to change.
let jobs = [...SEED_JOBS]

function clone(job) {
  return { ...job }
}

export async function findAll({ status, search } = {}) {
  let result = jobs

  if (status && status !== 'all') {
    result = result.filter((j) => j.status === status)
  }

  if (search) {
    const q = search.toLowerCase()
    result = result.filter(
      (j) =>
        j.company.toLowerCase().includes(q) || j.position.toLowerCase().includes(q),
    )
  }

  return result
    .slice()
    .sort((a, b) => (b.updated_at || '').localeCompare(a.updated_at || ''))
    .map(clone)
}

export async function findById(id) {
  const job = jobs.find((j) => j.id === id)
  return job ? clone(job) : null
}

export async function create(data) {
  const now = new Date().toISOString()
  const job = {
    id: uuidv4(),
    company: data.company,
    position: data.position,
    location: data.location || '',
    source: data.source || '',
    link: data.link || '',
    applied_date: data.applied_date || '',
    salary: data.salary || '',
    notes: data.notes || '',
    status: data.status || 'wishlist',
    created_at: now,
    updated_at: now,
  }
  jobs.push(job)
  return clone(job)
}

export async function update(id, data) {
  const index = jobs.findIndex((j) => j.id === id)
  if (index === -1) return null

  const updated = {
    ...jobs[index],
    ...data,
    id: jobs[index].id,
    created_at: jobs[index].created_at,
    updated_at: new Date().toISOString(),
  }
  jobs[index] = updated
  return clone(updated)
}

export async function remove(id) {
  const index = jobs.findIndex((j) => j.id === id)
  if (index === -1) return false
  jobs.splice(index, 1)
  return true
}

export async function stats() {
  const byStatus = {}
  for (const job of jobs) {
    byStatus[job.status] = (byStatus[job.status] || 0) + 1
  }
  return { total: jobs.length, byStatus }
}

// Helper only used by tests / manual resets — not part of the DB-parity contract.
export async function _resetForTesting() {
  jobs = [...SEED_JOBS]
}
