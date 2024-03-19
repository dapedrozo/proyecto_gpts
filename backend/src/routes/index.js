import authRoutes from './auth/auth.routes.js'
import logsRoutes from './auth/logs.routes.js'
import userRoutes from './users/users.routes.js'
import empresaRoutes from './users/empresa.routes.js'
import rolesRoutes from './authorization/roles.routes.js'
import permissionsRoutes from './authorization/permisos.routes.js'
import asistentesRoutes from './asistentes/asistentes.routes.js'

export function setupRoutes(app) {
  app.use('/auth', authRoutes)
  app.use('/logs', logsRoutes)
  app.use('/users', userRoutes)
  app.use('/empresa', empresaRoutes)
  app.use('/roles', rolesRoutes)
  app.use('/permissions', permissionsRoutes)
  app.use('/asistentes', asistentesRoutes)
}
