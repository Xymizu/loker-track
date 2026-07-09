import { env } from '../config/env.js'

export function errorHandler(err, req, res, next) {
  const status = err.status || 500
  const payload = { error: err.message || 'Terjadi kesalahan pada server' }

  if (env.nodeEnv === 'development' && err.stack) {
    payload.stack = err.stack
  }

  res.status(status).json(payload)
}

export class ApiError extends Error {
  constructor(status, message) {
    super(message)
    this.status = status
  }
}
