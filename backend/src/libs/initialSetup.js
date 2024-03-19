import Role from "../models/authorization/Role.js";
import Permission from "../models/authorization/Permisos.js";
import Empresa from "../models/usuarios/Empresa.js";
import User from "../models/usuarios/User.js";
import Asistente from '../models/asistentes/Asistente.js'
import config from '../config.js'

export const createDefaultPermissions = async () => {
  try {
    const countPermissions = await Permission.estimatedDocumentCount({ maxTimeMS: 100 })
    if (countPermissions > 0) return;
    const permissions = [
      { name: "crear-usuario", descripcion: "permiso para crear usuarios", tipoPermiso:"Usuarios" },
      { name: "ver-usuarios", descripcion: "permiso para ver usuarios", tipoPermiso:"Usuarios" },
      { name: "ver-usuario", descripcion: "permiso para ver un usuario", tipoPermiso:"Usuarios" },
      { name: "actualizar-usuario", descripcion: "permiso para actualizar usuarios", tipoPermiso:"Usuarios" },
      { name: "eliminar-usuario", descripcion: "permiso para eliminar usuarios", tipoPermiso:"Usuarios" },
      { name: "crear-empresa", descripcion: "permiso para crear empresa", tipoPermiso:"Empresas" },
      { name: "ver-empresas", descripcion: "permiso para ver empresas", tipoPermiso:"Empresas" },
      { name: "ver-empresa", descripcion: "permiso para ver una empresa", tipoPermiso:"Empresas" },
      { name: "actualizar-empresa", descripcion: "permiso para actualizar empresas", tipoPermiso:"Empresas" },
      { name: "eliminar-empresa", descripcion: "permiso para eliminar empresas", tipoPermiso:"Empresas" },
      { name: "crear-rol", descripcion: "permiso para crear rol", tipoPermiso:"Usuarios" },
      { name: "ver-roles", descripcion: "permiso para ver roles", tipoPermiso:"Usuarios" },
      { name: "ver-rol", descripcion: "permiso para ver un rol", tipoPermiso:"Usuarios" },
      { name: "actualizar-rol", descripcion: "permiso para actualizar roles", tipoPermiso:"Usuarios" },
      { name: "eliminar-rol", descripcion: "permiso para eliminar roles", tipoPermiso:"Usuarios" },
      { name: "ver-permisos", descripcion: "permiso para ver permisos", tipoPermiso:"Usuarios" },
      { name: "ver-logs", descripcion: "permiso obtener los logs del sistema", tipoPermiso:"SuperAdmin" },
      { name: "eliminar-logs", descripcion: "permiso eliminar todos los logs del sistema", tipoPermiso:"SuperAdmin" },
      { name: "realizar-validaciones", descripcion: "permiso realizar validaciones", tipoPermiso:"SuperAdmin" },
      { name: "ver-ajustes", descripcion: "permiso ver ajustes de super admin", tipoPermiso:"SuperAdmin" },
      { name: "ver-asistente", descripcion: "permiso ver un asistente en especifico", tipoPermiso:"Usuarios" },
      { name: "ver-asistentes", descripcion: "permiso ver asistentes", tipoPermiso:"Usuarios" },
      { name: "crear-conversacion", descripcion: "permiso crear una conversacion en un asistente", tipoPermiso:"Usuarios" },
      { name: "continuar-conversacion", descripcion: "permiso continuar una conversacion con un asistente", tipoPermiso:"Usuarios" },
      { name: "ver-thread", descripcion: "permiso ver un thread", tipoPermiso:"Usuarios" },
      { name: "ver-conversacion", descripcion: "permiso ver una conversacion", tipoPermiso:"Usuarios" },
    ];
    await Permission.create(permissions);
    console.log("Permisos creados");
  } catch (error) {
    console.log("erererer");
    console.log(error);
  }
};

export const createDefaultAsistentes = async () => {
  try {
    const countAsistentes = await Asistente.estimatedDocumentCount({ maxTimeMS: 100 })
    if (countAsistentes > 0) return;
    const defaultAsistente = [
      {
        idAsistente: config.ID_ASSISTANT,
        nombre: "Asistente Juridico",
      },
    ];
    await Asistente.create(defaultAsistente);
    console.log("Asistente creado");
  } catch (error) {
    console.log(error);
  }
};

export const createDefaultEmpresas = async () => {
  try {
    const countEmpresas = await Empresa.estimatedDocumentCount({ maxTimeMS: 100 })
    const asistente = await Asistente.findOne({nombre: "Asistente Juridico"});
    if (countEmpresas > 0) return;
    const defaultEmpresa = [
      {
        identificacion: "1098741116",
        apikey: config.API_KEY,
        asistentes: asistente._id
      },
    ];
    await Empresa.create(defaultEmpresa);
    console.log("Empresas creadas");
  } catch (error) {
    console.log(error);
  }
};

export const createDefaultRoles = async () => {
  try {
    const countRoles = await Role.estimatedDocumentCount({ maxTimeMS: 100 })
    if (countRoles > 0) return;
    const empresa = await Empresa.findOne({identificacion: "1098741116"})
    const permisos = await Permission.find();
    const defaultRoles = [
      {
        name: "superAdmin",
        descripcion: "Rol con todos los permisos",
        permissions: permisos.map((permission) => permission._id),
        empresa: empresa._id,
      },
    ];
    await Role.create(defaultRoles);
    console.log("Roles creados");
  } catch (error) {
    console.log(error);
  }
};

export const createDefaultUser = async () => {
  try {
    const countUsers = await User.estimatedDocumentCount({ maxTimeMS: 100 })
    if (countUsers > 0) return;
    const empresa = await Empresa.findOne({identificacion: "1098741116"})
    const role = await Role.findOne({name:"superAdmin"});
    //miniatura enlazada: <a href="https://ibb.co/Y0qQdDM"><img src="https://i.ibb.co/Y0qQdDM/conejito.png" alt="conejito" border="0"></a>
    //completa enlazada: <a href="https://ibb.co/Y0qQdDM"><img src="https://i.ibb.co/jJ1fwV2/conejito.png" alt="conejito" border="0"></a>
    //enlace de visualizador: https://ibb.co/Y0qQdDM
    const defaultUser = [
      {
        nombre: "david pedrozo",
        empresa: empresa._id,
        email: "dpedrozo421@unab.edu.co",
        numeroTelefono: "3219354565",
        imagenPerfil: "https://i.ibb.co/Y0qQdDM/conejito.png",
        password: await User.encryptPassword("123"),
        roles: role._id,
      },
      {
        nombre: "sistema",
        empresa: empresa._id,
        email: "sistema@sistema.co",
        numeroTelefono: "3219354565",
        password: await User.encryptPassword("123"),
        roles: role._id,
      },
    ];
    await User.create(defaultUser);
    console.log("Usuario super admin y sistema creados");
  } catch (error) {
    console.log(error);
  }
};