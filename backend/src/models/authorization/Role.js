import { Schema, model } from "mongoose";

const roleSchema = new Schema(
  {
    name: String,
    empresa: [{
      type: Schema.Types.ObjectId,
      ref: "Empresa",
      required: true
    }],
    descripcion : String,
    permissions: [
      {
        type: Schema.Types.ObjectId,
        ref: "Permission",
      },
    ],
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default model("Role", roleSchema);
