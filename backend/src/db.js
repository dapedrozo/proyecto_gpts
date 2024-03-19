import mongoose from "mongoose";
import config from "./config.js";

mongoose.connect(config.DB.URI);
const db = mongoose.connection;
db.once("open", () => {
  console.log(">>> Conexión a MongoDB establecida");
});
db.on("error", (err) => {
  console.log("Ocurrio un error en la conexion a la base de datos: " + err);
  process.exit(0);
});