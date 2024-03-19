import Permisos from "../../../models/authorization/Permisos.js";

export const getPermisos = async (req, res) => {
    try {
      const permisos = await Permisos.find()
      res.status(200).json({ permisos })
    } catch (error) {
      res.status(500).json({ error: "Error al obtener los permisos" });
    }
  };