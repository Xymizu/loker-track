import { env } from '../config/env.js'
import * as memoryStore from './stores/memoryStore.js'
import * as mysqlStore from './stores/mysqlStore.js'

// Controllers only ever talk to this file. Switching DATA_SOURCE in .env
// from "memory" to "mysql" (once mysqlStore.js is implemented) is the only
// change needed to move the whole API onto a real database.
const activeStore = env.dataSource === 'mysql' ? mysqlStore : memoryStore

export const jobsRepository = {
  findAll: activeStore.findAll,
  findById: activeStore.findById,
  create: activeStore.create,
  update: activeStore.update,
  remove: activeStore.remove,
  stats: activeStore.stats,
}
