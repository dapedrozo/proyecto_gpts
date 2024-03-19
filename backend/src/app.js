import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import helmet from 'helmet'
import rateLimit from 'express-rate-limit'
import { passportAuth, registerLog } from './middlewares/index.js'
import axios from 'axios'
import axiosRetry from 'axios-retry'
import {setupRoutes} from './routes/index.js'
import {createDefaultPermissions, createDefaultRoles, createDefaultEmpresas, createDefaultAsistentes, createDefaultUser} from './libs/initialSetup.js'
import config from './config.js'

const app = express()

app.use(cors({
  origin:config.FRONTENDURL,
  credentials:true
}))
app.use(morgan('dev'))
app.use(helmet())
app.use(passportAuth.passport.initialize())
app.use(express.json({ limit: '50mb' }))

await createDefaultPermissions() 
await createDefaultAsistentes()
await createDefaultEmpresas() 
await createDefaultRoles() 
await createDefaultUser()

app.use((req, res, next) => {
    const path = req.path
    if (
      path === '/auth/login' ||
      path.startsWith('/auth/update-password') ||
      path.startsWith('/auth/forgot-password')
    ) {
      next()
    } else {
        passportAuth.authenticateJwt(req, res, next)
    }
  })
app.use(registerLog.registerLogs)

setupRoutes(app)

export default app