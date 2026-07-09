import { createApp } from './app.js'
import { env } from './config/env.js'

const app = createApp()

app.listen(env.port, () => {
  console.log(`LokerTrack API jalan di http://localhost:${env.port}`)
  console.log(`Data source: ${env.dataSource}`)
})
