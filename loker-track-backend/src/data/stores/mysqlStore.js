import mysql from 'mysql2/promise'
import { v4 as uuidv4 } from 'uuid'
import { env } from '../../config/env.js'

// Real MySQL-backed implementation. Same function names and return shapes
// as memoryStore.js, so controllers / jobsRepository.js never need to change.
//
// Setup:
//   1. `npm install` (mysql2 is already in package.json)
//   2. Import schema.sql into your MySQL server (see backend README)
//   3. Fill DB_* values in .env
//   4. Set DATA_SOURCE=mysql in .env

const pool = mysql.createPool({
  host: env.db.host,
  port: env.db.port,
  user: env.db.user,
  password: env.db.password,
  database: env.db.name,
  waitForConnections: true,
  connectionLimit: 10,
  dateStrings: true, // return DATE/DATETIME as plain strings instead of JS Date objects
})

function normalize(row) {
  if (!row) return null
  return {
    ...row,
    applied_date: row.applied_date || '',
    location: row.location || '',
    source: row.source || '',
    link: row.link || '',
    salary: row.salary || '',
    notes: row.notes || '',
  }
}

export async function findAll({ status, search } = {}) {
  const clauses = []
  const params = []

  if (status && status !== 'all') {
    clauses.push('status = ?')
    params.push(status)
  }

  if (search) {
    clauses.push('(company LIKE ? OR position LIKE ?)')
    params.push(`%${search}%`, `%${search}%`)
  }

  const where = clauses.length ? `WHERE ${clauses.join(' AND ')}` : ''
  const [rows] = await pool.query(`SELECT * FROM jobs ${where} ORDER BY updated_at DESC`, params)
  return rows.map(normalize)
}

export async function findById(id) {
  const [rows] = await pool.query('SELECT * FROM jobs WHERE id = ?', [id])
  return rows[0] ? normalize(rows[0]) : null
}

export async function create(data) {
  const id = uuidv4()

  await pool.query(
    `INSERT INTO jobs (id, company, position, location, source, link, applied_date, salary, notes, status)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      id,
      data.company,
      data.position,
      data.location || '',
      data.source || '',
      data.link || '',
      data.applied_date || null,
      data.salary || '',
      data.notes || '',
      data.status || 'wishlist',
    ],
  )

  return findById(id)
}

export async function update(id, data) {
  const existing = await findById(id)
  if (!existing) return null

  const merged = {
    company: data.company ?? existing.company,
    position: data.position ?? existing.position,
    location: data.location ?? existing.location,
    source: data.source ?? existing.source,
    link: data.link ?? existing.link,
    applied_date: data.applied_date !== undefined ? data.applied_date || null : existing.applied_date || null,
    salary: data.salary ?? existing.salary,
    notes: data.notes ?? existing.notes,
    status: data.status ?? existing.status,
  }

  await pool.query(
    `UPDATE jobs
     SET company = ?, position = ?, location = ?, source = ?, link = ?,
         applied_date = ?, salary = ?, notes = ?, status = ?
     WHERE id = ?`,
    [
      merged.company,
      merged.position,
      merged.location,
      merged.source,
      merged.link,
      merged.applied_date,
      merged.salary,
      merged.notes,
      merged.status,
      id,
    ],
  )

  return findById(id)
}

export async function remove(id) {
  const [result] = await pool.query('DELETE FROM jobs WHERE id = ?', [id])
  return result.affectedRows > 0
}

export async function stats() {
  const [[{ total }]] = await pool.query('SELECT COUNT(*) AS total FROM jobs')
  const [rows] = await pool.query('SELECT status, COUNT(*) AS count FROM jobs GROUP BY status')

  const byStatus = {}
  for (const row of rows) byStatus[row.status] = row.count

  return { total, byStatus }
}
