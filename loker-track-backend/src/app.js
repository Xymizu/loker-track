import express from 'express'
import cors from 'cors'
import { env } from './config/env.js'
import routes from './routes/index.js'
import { notFound } from './middleware/notFound.js'
import { errorHandler } from './middleware/errorHandler.js'

export function createApp() {
  const app = express()

  app.use(cors({ origin: env.corsOrigin }))
  app.use(express.json())

  app.get('/health', (req, res) => {
    res.json({ status: 'ok', dataSource: env.dataSource })
  })

  app.use('/api', routes)

  app.use(notFound)
  app.use(errorHandler)

  return app
}
