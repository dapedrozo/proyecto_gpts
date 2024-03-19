import Role from "../../../models/authorization/Role.js";

export const createRole = async (req, res) => {
  try {    
    const { name, permissions, empresa, descripcion } = req.body;
    const role = new Role({ name, permissions, empresa, descripcion });
    await role.save();
    res.status(201).json({ message: "Rol creado exitosamente" });
  } catch (error) {
    if (error.name === "ValidationError") {
      return res.status(400).json(errorResponse(400, error.message));
    }
    return res
      .status(500)
      .json(errorResponse(500, messages.error.serverError));
  }
};

export const getRoles = async (req, res) => {
  try {
    const roles = await Role.find().populate({
      path: "permissions",
      select: "_id name descripcion"
    }).populate({
      path: "empresa",
      select:"_id name"
    });
    res.status(200).json({ roles })
  } catch (error) {
    res.status(500).json({ error: "Error al obtener los roles" });
  }
};

export const getRoleById = async (req, res) => {
  try {
    const { id } = req.params;
    const role = await Role.findById(id).populate({
      path: "permissions",
      select: "_id name descripcion"
    }).populate({
      path: "empresa",
      select:"_id name"
    });
    if (!role) {
      return res
        .status(404)
        .json(errorResponse(404, messages.error.notFound));
    }
    res.status(200).json({ role });
  } catch (error) {
    return res.status(500).json(errorResponse(500, messages.error.serverError));
  }
};

export const updateRole = async (req, res) => {
  try {
    const { id } = req.params;
    const role = await Role.findByIdAndUpdate(
      id,
      req.body,
      { new: true }
    );
    if (!role) {
      return res.status(404).json({ error: "Rol no encontrado" });
    }
    res.status(200).json({ message: "Rol actualizado exitosamente" });
  } catch (error) {
      if (error.name === "ValidationError") {
        return res.status(400).json(errorResponse(400, error.message));
      }
      return res
        .status(500)
        .json(errorResponse(500, messages.error.serverError));
  }
};

export const deleteRole = async (req, res) => {
  try {
    const { id } = req.params;
    const role = await Role.findByIdAndDelete(id);
    if (!role) {
      return res.status(404).json({ error: "Rol no encontrado" });
    }
    res.status(200).json({ message: "Rol eliminado exitosamente" });
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar el rol" });
  }
};


