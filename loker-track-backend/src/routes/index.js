import { Router } from 'express'
import jobsRoutes from './jobsRoutes.js'

const router = Router()

router.get('/', (req, res) => {
  res.json({ message: 'LokerTrack API aktif', endpoints: ['/api/jobs'] })
})

router.use('/jobs', jobsRoutes)

export default router
