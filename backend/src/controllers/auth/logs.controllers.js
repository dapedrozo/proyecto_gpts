import Log from '../../models/authorization/Log.js'

export const getLogs = async (req, res) => {
    try {
      const logs = await Log.find().populate({
        path: "registradoPor",
        select:"-password"
      });
      res.json(logs);
    } catch (error) {
      res.status(500).json({ error: "Error al obtener los logs" });
    }
  };

export const deleteLogs = async (req, res) => {
    try {
      const result = await Log.deleteMany({});
      res.json({message: `Se eliminaron ${result.deletedCount} registros.`});
    } catch (error) {
      res.status(500).json({ error: "Error al eliminar los logs" });
    }
  };
