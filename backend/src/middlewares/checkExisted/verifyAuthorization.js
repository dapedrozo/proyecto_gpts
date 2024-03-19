import Role from "../../models/authorization/Role.js";
import User from "../../models/usuarios/User.js";
import Empresa from '../../models/usuarios/Empresa.js'

export const checkRoles = async (req, res, next) => {
  try {
    if (req.params.id) {
      const { id } = req.params;
      const { name } = req.body;
      if(!name && !await Role.findById(id)) res.status(404).json({ error: "Rol no encontrado" })
      next()
    } else {
      const { name } = req.body;
      if(!name) res.status(400).json({ error: "El nombre del rol no fue proporcionado" })
      if(await Role.findOne({ name })) res.status(400).json({ error: "El rol ya existe" })
      next()
    }
  } catch (error) {
    return res.status(500).json({ error: "Error al verificar la existencia del rol" });
  }
};

export const checkUserAndRole = async (req, res, next) => {
  try {
    if (req.params.id) {
      const { id } = req.params;
      const { email, roles } = req.body;
      if(!await User.findById(id)) res.status(404).json({ error: "Usuario no encontrado" })
      if(!email && !roles) next()
      if(!await Role.findById(roles)) res.status(404).json({ error: "Rol no encontrado" })
      next()
    } else {
      const { email, roles } = req.body;
      if (!email || !roles) return res.status(400).json({ error: "El email o el rol no fue proporcionado" })
      const user = await User.findOne({ email });
      if (user) return res.status(400).json({ error: "El usuario ya existe", id: user._id })
      const role = await Role.findById(roles);
      if (!role) return res.status(400).json({ error: "El rol no existe" })
      next();
    }
  } catch (error) {
    return res.status(500).json({ error: "Error al verificar la existencia del rol o el usuario" })
  }
};

export const checkEmpresas = async (req, res, next) => {
  try {
    if (req.params.id) {
      const { id } = req.params;
      const { identificacion, tipoEmpresa } = req.body;
      !tipoEmpresa || !identificacion
      if(!await Empresa.findById(id)) res.status(404).json({ error: "Empresa no encontrada" })
      next()
    } else {
      const { identificacion, tipoEmpresa } = req.body;
      if(!tipoEmpresa || !identificacion) res.status(400).json({ error: "El tipo o identificacion de la empresa no fue proporcionada" })
      if(await Empresa.findOne({ identificacion })) res.status(400).json({ error: "La empresa ya existe" })
      next()
    }
  } catch (error) {
    return res.status(500).json({ error: "Error al verificar la existencia de la empresa" });
  }
};

export const checkAuthorization = (permission) => {
  try {
    return (req, res, next) => {
      const hasPermission = req.user?.roles?.permissions?.some(p => p.name === permission); 
      if (!hasPermission) return res.status(403).json({ message: 'No tienes permisos suficientes.'});
      next()
    };
  } catch (error) {
    return res.status(500).json({ message: 'Ocurrio un error inesperado.' });
  }
};
