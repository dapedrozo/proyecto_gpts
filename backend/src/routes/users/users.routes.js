import {Router} from 'express'
import * as userController from '../../controllers/usuarios/users/user.controllers.js'
import {verifyAuthorization, GeneralsUser} from '../../middlewares/index.js'

const router = Router()

const generalMiddlewares = [
    verifyAuthorization.checkUserAndRole,
];

const getMiddlewares = [
    verifyAuthorization.checkAuthorization("ver-usuarios"),
    GeneralsUser.checkUserGets
];
  
router.post('/', [...generalMiddlewares, verifyAuthorization.checkAuthorization("crear-usuario"), GeneralsUser.checkUserRolesCreateAndUpdate], userController.createUser)

router.get('/', getMiddlewares, userController.getUsers)

router.get('/:id', getMiddlewares, userController.getUserById)

router.put('/:id', [...generalMiddlewares, verifyAuthorization.checkAuthorization("actualizar-usuario"), GeneralsUser.checkUserRolesCreateAndUpdate], userController.updateUser)

router.delete('/:id', [...generalMiddlewares, verifyAuthorization.checkAuthorization("eliminar-usuario")], userController.deleteUser)

export default router