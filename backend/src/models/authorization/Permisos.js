import { Schema, model } from "mongoose";

const permissionSchema = new Schema(
  {
    name: String,
    descripcion: String,
    tipoPermiso: {
      type: String,
      enum: ["Usuarios", "Empresas", "Admin", "SuperAdmin"],
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default model("Permission", permissionSchema);
