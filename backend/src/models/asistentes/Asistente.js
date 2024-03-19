import { Schema, model } from "mongoose";

const asistenteSchema = new Schema({
    idAsistente: {
        type: String,
        required: true
    },
    nombre: {
        type: String,
        required: true,
        unique: true
    },
    threads: [{
        ref: "Thread",
        type: Schema.Types.ObjectId,
        required: true
      }]
},
{
  timestamps: true,
  versionKey: false,
});

export default model("Asistente", asistenteSchema);
