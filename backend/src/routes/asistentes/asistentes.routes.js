import {Router} from 'express'
import * as asistentesController from '../../controllers/asistentes/asistentes.controllers.js'
import {passportAuth, verifyAuthorization} from '../../middlewares/index.js'

const router = Router()

router.get('/:idEmpresa', [passportAuth.authenticateJwt, verifyAuthorization.checkAuthorization("ver-asistentes")], asistentesController.getAsistentes)

router.get('/thread/:id', [passportAuth.authenticateJwt, verifyAuthorization.checkAuthorization("ver-thread")], asistentesController.getThreads)

router.get('/conversacion/:id', [passportAuth.authenticateJwt, verifyAuthorization.checkAuthorization("ver-conversacion")], asistentesController.getConversacion)

router.post('/crear-conversacion', [passportAuth.authenticateJwt, verifyAuthorization.checkAuthorization("crear-conversacion")], asistentesController.createThread)

router.post('/continuar-conversacion/:threadId', [passportAuth.authenticateJwt, verifyAuthorization.checkAuthorization("continuar-conversacion")], asistentesController.continueThread)

export default router