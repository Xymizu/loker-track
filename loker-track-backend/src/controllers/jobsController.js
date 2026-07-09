import { jobsRepository } from '../data/jobsRepository.js'
import { ApiError } from '../middleware/errorHandler.js'

export async function listJobs(req, res, next) {
  try {
    const { status, search } = req.query
    const jobs = await jobsRepository.findAll({ status, search })
    res.json({ data: jobs })
  } catch (err) {
    next(err)
  }
}

export async function getJob(req, res, next) {
  try {
    const job = await jobsRepository.findById(req.params.id)
    if (!job) throw new ApiError(404, 'Lamaran tidak ditemukan')
    res.json({ data: job })
  } catch (err) {
    next(err)
  }
}

export async function createJob(req, res, next) {
  try {
    const job = await jobsRepository.create(req.body)
    res.status(201).json({ data: job })
  } catch (err) {
    next(err)
  }
}

export async function updateJob(req, res, next) {
  try {
    const job = await jobsRepository.update(req.params.id, req.body)
    if (!job) throw new ApiError(404, 'Lamaran tidak ditemukan')
    res.json({ data: job })
  } catch (err) {
    next(err)
  }
}

export async function deleteJob(req, res, next) {
  try {
    const deleted = await jobsRepository.remove(req.params.id)
    if (!deleted) throw new ApiError(404, 'Lamaran tidak ditemukan')
    res.status(204).send()
  } catch (err) {
    next(err)
  }
}

export async function getStats(req, res, next) {
  try {
    const data = await jobsRepository.stats()
    res.json({ data })
  } catch (err) {
    next(err)
  }
}
