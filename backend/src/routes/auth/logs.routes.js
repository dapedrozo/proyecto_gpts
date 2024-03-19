import {Router} from 'express'
import * as logsController from '../../controllers/auth/logs.controllers.js'
import {verifyAuthorization} from '../../middlewares/index.js'

const router = Router()

router.get('/', verifyAuthorization.checkAuthorization("ver-logs"), logsController.getLogs)
router.delete('/', verifyAuthorization.checkAuthorization("eliminar-logs"), logsController.deleteLogs)

export default router