import { Schema, model } from "mongoose";

const empresaSchema = new Schema(
  {
    identificacion: {
      type: String,
      required: true
    },
    tipoEmpresa: {
      type: String,
      required: true,
      enum: ["Empresa", "Persona"],
      default: "Persona",
    },
    apikey: {
      type: String,
    },
    asistentes: [{
      type: Schema.Types.ObjectId,
      ref: 'Asistente'
    }],
    estado: {
      type: String,
      enum: ["Activo", "Eliminado"],
      default: "Activo",
    }, 
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default model("Empresa", empresaSchema);
