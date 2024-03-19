import Empresa from "../../../models/usuarios/Empresa.js";

export const createEmpresa = async (req, res) => {
  try {
    const { nit, name, tipoEmpresa } = req.body;
    const newEmpresa = new Empresa({
        nit,
        name,
        tipoEmpresa
    });
    await newEmpresa.save();
    res.status(201).json({ message: "Empresa creada exitosamente" });
  } catch (error) {
    if (error.name === "ValidationError") {
      return res.status(400).json(errorResponse(400, error.message));
    }
    return res
      .status(500)
      .json(errorResponse(500, messages.error.serverError));
  }
};

export const getEmpresas = async (req, res) => {
  try {
    let query = { estado: "Activo" };
    req.user.roles.name !=="superAdmin" ? query.name = req.user.empresa.name : query.name = { $ne: "CREDICORP" }
    const empresas = await Empresa.find(query).sort({ updatedAt: -1 });
    res.status(200).json({ empresas });
  } catch (error) {
    res.status(500).json({ error: "Error al obtener las empresas" });
  }
};

export const getEmpresaByEstadoInactivo = async (req, res) => {
  try {
    let query = { estado: "Eliminado" };
    req.user.roles.name !=="superAdmin" ? query.name = req.user.empresa.name : query.name = { $ne: "CREDICORP" }
    const empresasInactivas = await Empresa.find(query).sort({ updatedAt: -1 });
    res.status(200).json({ empresasInactivas });
  } catch (error) {
    res.status(500).json({ error: "Error al obtener las empresas" });
  }
};

export const getEmpresaById = async (req, res) => {
  try {
    const { id } = req.params;
    let queryFind = req.query
    queryFind._id = id
    const empresa = await Empresa.findOne(queryFind);
    if (!empresa) {
      return res.status(404).json(errorResponse(404, messages.error.notFound));
    }
    res.status(200).json({ empresa });
  } catch (error) {
    return res.status(500).json(errorResponse(500, messages.error.serverError));
  }
};

export const updateEmpresa = async (req, res) => {
  try {
    const { id } = req.params;
    await Empresa.findByIdAndUpdate(id, req.body, { new: true });
    const empresa = await Empresa.findOne(queryFind);
    if (!empresa) {
      return res.status(404).json(errorResponse(404, messages.error.notFound));
    }
    res.status(200).json({ message: "Empresa actualizada exitosamente" });
  } catch (error) {
    if (error.name === "ValidationError") {
      return res.status(400).json(errorResponse(400, error.message));
    }
    return res
      .status(500)
      .json(errorResponse(500, messages.error.serverError));
  }
};

export const deleteEmpresa = async (req, res) => {
    try {
      const { id } = req.params;
      await Empresa.findByIdAndUpdate(id, {estado:"Eliminado"}, { new: true });
      res.status(200).json({ message: "Empresa eliminada exitosamente" });
    } catch (error) {
      res.status(500).json({ error: "Error al eliminar la empresa" });
    }
  };
