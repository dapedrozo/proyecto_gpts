import User from "../../models/usuarios/User.js";
import tokensWhitelist from '../../models/generals/TokensWhitelist.js';
import { passportAuth } from '../../middlewares/index.js';

export const signIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    const userFound = await User.findOne({ email, estado:"Activo" }).populate({
      path: "empresa",
      select: "-_id identificacion tipoEmpresa",
      populate: {
        path: "asistentes",
        select: "_id nombre"
      }
    }).populate({
      path: "roles",
      select:"-_id -empresa",
      populate: {
        path: "permissions",
        select: "-_id name"
      }
    })
    if (!userFound) return res.status(400).json({ token: null, message: "usuario no encontrado" })
    const matchPassword = await User.comparePassword(
      password,
      userFound.password
    )
    if (!matchPassword) return res.status(400).json({ token: null, message: "usuario no encontrado" })
    const token = passportAuth.generateToken(userFound)
    const jtiToken = passportAuth.decodeToken(token);
    const lastActivity = new Date()
    const newTokenWhiteList = new tokensWhitelist({
      jtiToken,
      lastActivity
    });
    await newTokenWhiteList.save()
    await User.findOneAndUpdate({ _id: userFound._id },{ lastLogin: lastActivity },{ new: true })
    res.status(200).json(token)
  } catch (error) {
    console.log(error);
    res.status(422).json(error)
  }
};

export const logout = async (req, res) => {
  try {
    const authorizationHeader = req.headers["authorization"];
    if (!authorizationHeader) return res.status(403).json({ message: "no se recibió el token" });
    if (!authorizationHeader.startsWith("Bearer ")) return res.status(400).send("Encabezado Authorization incorrecto");
    const token = authorizationHeader.slice(7);
    const jtiToken = passportAuth.decodeToken(token);
    if (!jtiToken) return res.status(400).json({ token: null, message: "ocurrió un error con el token" });
    await tokensWhitelist.findOneAndDelete({ jtiToken });
    res.status(200).json({ token: null, message: "logout correcto" });
  } catch (error) {
    console.error(error);
    res.status(422).json(error)
  }
};

export const verifyToken = async (req, res) => {
  try {
    if(!req.user) res.status(401).json({message: "unauthorized"})
    res.status(200).json(req.user)
  } catch (error) {
    console.error(error);
    res.status(422).json(error)
  }
};

export const signInUsuarioSistema = async (userSistema) => {
  try {
    const lastActivity = new Date();
    userSistema.lastLogin = lastActivity
    const token = passportAuth.generateToken(userSistema)
    const jtiToken = passportAuth.decodeToken(token)
    if(!jtiToken) return res.status(400).json({ token: null, message: "ocurrio un error" });
    const newTokenWhiteList = new tokensWhitelist({
      jtiToken,
      lastActivity
    });
    await newTokenWhiteList.save();
    await User.findOneAndUpdate({ _id: userSistema._id },{ lastLogin: lastActivity },{ new: true })
    return token
  } catch (error) {
    console.log(error);
    return "Ocurrió un error y no se pudo loggear el usuario"
  }
};

export const logoutUsuarioSistema = async (tokenUsuarioSistema)=>{
  try {
    const jtiToken = passportAuth.decodeToken(tokenUsuarioSistema)
    if(!jtiToken) return res.status(400).json({ token: null, message: "ocurrio un error" });
    const deletedToken = await tokensWhitelist.findOneAndDelete({ jtiToken })
    if (deletedToken) {
      return "logout correcto"
    } else {
      return "ocurrio un error"
    }
  } catch (error) {
    return "Ocurrió un error y no se pudo salir de la sesion"
  }
}