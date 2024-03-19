import {Router} from 'express'
import * as rolesController from '../../controllers/authorization/roles/roles.controllers.js'
import {verifyAuthorization} from '../../middlewares/index.js'

const router = Router()

const generalMiddlewares = [
    verifyAuthorization.checkRoles,
  ];


router.post('/', [...generalMiddlewares, verifyAuthorization.checkAuthorization("crear-rol")], rolesController.createRole)
router.get('/', verifyAuthorization.checkAuthorization("ver-roles"), rolesController.getRoles)
router.get('/:id', [...generalMiddlewares, verifyAuthorization.checkAuthorization("ver-rol")], rolesController.getRoleById)
router.put('/:id', [...generalMiddlewares, verifyAuthorization.checkAuthorization("actualizar-rol")], rolesController.updateRole)
router.delete('/:id', [...generalMiddlewares, verifyAuthorization.checkAuthorization("eliminar-rol")], rolesController.deleteRole)

export default router