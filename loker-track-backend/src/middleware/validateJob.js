import { JOB_STATUSES } from '../utils/constants.js'
import { ApiError } from './errorHandler.js'

const REQUIRED_FIELDS = ['company', 'position']

export function validateJobPayload(req, res, next) {
  const { company, position, status } = req.body

  const missing = REQUIRED_FIELDS.filter((field) => !req.body[field] || !String(req.body[field]).trim())
  if (missing.length > 0) {
    return next(new ApiError(400, `Field wajib diisi: ${missing.join(', ')}`))
  }

  if (status && !JOB_STATUSES.includes(status)) {
    return next(
      new ApiError(400, `Status tidak valid. Pilih salah satu: ${JOB_STATUSES.join(', ')}`),
    )
  }

  next()
}
