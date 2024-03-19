import User from "../../../models/usuarios/User.js";

export const createUser = async (req, res) => {
  try {
    const {
      primerNombre,
      segundoNombre,
      primerApellido,
      segundoApellido,
      cargo,
      empresa,
      email,
      numeroTelefono,
      imagenPerfil,
      roles,
    } = req.body;

    const data = {email, primerNombre, primerApellido}
    const newUser = new User({
      primerNombre,
      segundoNombre,
      primerApellido,
      segundoApellido,
      cargo,
      empresa,
      email,
      numeroTelefono,
      imagenPerfil,
      password: User.encryptFirstPasswordUser(data),
      roles,
    });
    await newUser.save();
    res.status(201).json({ message: "Usuario creado exitosamente", email: newUser.email, tokenAsignado: newUser.password });
  } catch (error) {
    if (error.name === "ValidationError") {
      return res.status(400).json(errorResponse(400, error.message));
    }
    return res.status(500).json(errorResponse(500, messages.error.serverError));
  }
};

export const getUsers = async (req, res) => {
  try {
    const users = await User.find(req.query).select("-password").populate({
      path: "empresa",
      select: "-_id name tipoEmpresa"
    }).populate({
      path: "roles",
      select:"-_id -empresa",
      populate: {
        path: "permissions",
        select: "-_id name"
      }
    });
    res.status(200).json({ users });
  } catch (error) {
    res.status(500).json({ error: "Error al obtener los usuarios" });
  }
};

export const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    let queryFind = req.query
    queryFind._id = id
    const user = await User.findOne(queryFind).select("-password")
      .populate({
        path: "empresa",
        select: "_id name tipoEmpresa nit"
      })
      .populate({
        path: "roles",
        select: "_id name",
        populate: {
          path: "permissions",
          select: "_id name"
        }
      });
    !user ? res.status(403).json({ error: "No tienes permisos para ver este usuario." }) : res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ error: "Error al obtener el usuario" });
  }
};

export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const userData = { ...req.body };
    if ('password' in userData) {
      delete userData.password
    }
    await User.findByIdAndUpdate(id, userData, { new: true });
    res.status(200).json({ message: "Usuario actualizado exitosamente" });
  } catch (error) {
    if (error.name === "ValidationError") {
      return res.status(400).json(errorResponse(400, error.message));
    }
    return res
      .status(500)
      .json(errorResponse(500, messages.error.serverError));
  }
};

export const deleteUser = async (req, res) => {
    try {
      const { id } = req.params;
      await User.findByIdAndUpdate(id, {estado:"Eliminado"}, { new: true });
      res.status(200).json({ message: "Usuario eliminado exitosamente" });
    } catch (error) {
      res.status(500).json({ error: "Error al eliminar el usuario" });
    }
  };

export const updateFirstPasswordUser = async (req, res) => {
  try {
    const { id } = req.params;
    const {password} = req.body;
    const userValid = password && id
    ? (User.decryptFistPasswordUser(id))
    : false;
    userValid
      ? await User.findOneAndUpdate({ email: userValid.email }, {password:await User.encryptPassword(password)}, { new: true })
        ? res.status(200).json({ message: "Datos actualizados exitosamente" })
        : res.status(403).json({ message: 'Ocurrio un error y no se pudo actualizar los campos' })
      : res.status(403).json({ message: 'No se pudo validar el token o no se proporciono la contraseña' });
  } catch (error) {
    res.status(500).json({ error: "Ocurrio un error inesperado" });
  }
};

export const updatePasswordUser = async (req, res) => {
  try {
    const {password} = req.body
    const {_id} = req.user
    (password && _id)
      ? await User.findByIdAndUpdate(_id, {password:await User.encryptPassword(password)}, { new: true })
        ? res.status(200).json({ message: "Datos actualizados exitosamente" })
        : res.status(403).json({ message: 'Ocurrio un error y no se pudo actualizar los campos' })
      : res.status(403).json({ message: 'No se pudo validar el usuario' });
  } catch (error) {
    res.status(500).json({ error: "Ocurrio un error inesperado" });
  }
};

export const getUserByEmailChangePassword = async (req, res) => {
  try {
    const {email} = req.body
    if(!email) return res.status(403).json({ message: 'No se proporciono el email' })
    const userFound = await User.findOne({email}).select("-password")
    if(!userFound) return res.status(403).json({ message: 'No se encontro el usuario' })
    const {primerNombre, primerApellido} = userFound
    const token = User.encryptFirstPasswordUser({email, primerNombre, primerApellido})
    return res.status(200).json({ tokenAsignado: token });
  } catch (error) {
    res.status(500).json({ error: "Ocurrio un error inesperado" });
  }
};