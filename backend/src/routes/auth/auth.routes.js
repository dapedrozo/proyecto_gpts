import {Router} from 'express'
import * as authController from '../../controllers/auth/auth.controllers.js'
import * as userController from '../../controllers/usuarios/users/user.controllers.js'
import {passportAuth, verifyAuthorization} from '../../middlewares/index.js'
import {validateSchema} from '../../middlewares/checkExisted/validator.js'
import {loginSchema} from '../../schemas/auth.schema.js'

const router = Router()

router.post('/login', [passportAuth.ensureAuthenticated, validateSchema(loginSchema)], authController.signIn)
router.get('/logout', authController.logout)
router.get('/verify-token', passportAuth.authenticateJwt, authController.verifyToken)

router.put('/update-password/:id', passportAuth.ensureAuthenticated, userController.updateFirstPasswordUser)
router.post('/forgot-password', passportAuth.ensureAuthenticated, userController.getUserByEmailChangePassword)
router.put('/forgot-password/:id', passportAuth.ensureAuthenticated, userController.updateFirstPasswordUser)
router.put('/update-password', [passportAuth.authenticateJwt, verifyAuthorization.checkAuthorization("actualizar-usuario")], userController.updatePasswordUser)

export default router