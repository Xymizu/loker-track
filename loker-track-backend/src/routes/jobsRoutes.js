import { Router } from 'express'
import {
  listJobs,
  getJob,
  createJob,
  updateJob,
  deleteJob,
  getStats,
} from '../controllers/jobsController.js'
import { validateJobPayload } from '../middleware/validateJob.js'

const router = Router()

router.get('/', listJobs)
router.get('/stats/overview', getStats)
router.get('/:id', getJob)
router.post('/', validateJobPayload, createJob)
router.put('/:id', validateJobPayload, updateJob)
router.delete('/:id', deleteJob)

export default router
