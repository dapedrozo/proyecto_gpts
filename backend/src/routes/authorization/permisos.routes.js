import { Router } from "express";
import * as permissionsController from "../../controllers/authorization/permisos/permisos.controllers.js";
import { verifyAuthorization } from "../../middlewares/index.js";

const router = Router();

router.get("/", verifyAuthorization.checkAuthorization("ver-permisos"), permissionsController.getPermisos);

export default router;
