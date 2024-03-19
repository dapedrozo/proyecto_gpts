import {Router} from 'express'
import * as empresaController from '../../controllers/usuarios/empresa/empresa.controllers.js'
import {verifyAuthorization, GeneralsEmpresa} from '../../middlewares/index.js'

const router = Router()

const generalMiddlewares = [
    verifyAuthorization.checkEmpresas,
  ];
const getMiddlewares = [
    verifyAuthorization.checkAuthorization("ver-empresas"),
    GeneralsEmpresa.checkEmpresaGets
  ];

router.post('/', [...generalMiddlewares, verifyAuthorization.checkAuthorization("crear-empresa")], empresaController.createEmpresa)

router.get('/', getMiddlewares, empresaController.getEmpresas)

router.get('/inactivas', getMiddlewares, empresaController.getEmpresaByEstadoInactivo)

router.get('/:id', [...generalMiddlewares, verifyAuthorization.checkAuthorization("ver-empresa"), GeneralsEmpresa.checkEmpresaGets], empresaController.getEmpresaById)

router.put('/:id', [...generalMiddlewares, verifyAuthorization.checkAuthorization("actualizar-empresa")], empresaController.updateEmpresa)

router.delete('/:id', [...generalMiddlewares, verifyAuthorization.checkAuthorization("eliminar-empresa")], empresaController.deleteEmpresa)


export default router