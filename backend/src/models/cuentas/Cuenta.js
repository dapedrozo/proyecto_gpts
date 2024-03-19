import { Schema, model } from "mongoose";

const cuentaSchema = new Schema({
    usuario: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    },
    empresa: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Empresa',
        required: true
    },
    creditos: {
        type: Number,
        default: 0
    }
},
{
  timestamps: true,
  versionKey: false,
});

export default model('Cuenta', cuentaSchema);