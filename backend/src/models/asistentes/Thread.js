import { Schema, model } from "mongoose";

const conversacionSchema = new Schema({
  roleConversacion: {
      type: String,
      required: true
  },
  contenido: {
      type: String,
      required: true
  }
},
{
timestamps: true,
versionKey: false,
});

const threadSchema = new Schema({
    idThread: {
        type: String,
        required: true
    },
    resumen: {
      type: String, 
      trim:true
    },
    conversaciones: {type:[conversacionSchema]}
},
{
  timestamps: true,
  versionKey: false,
});

export default model("Thread", threadSchema);
