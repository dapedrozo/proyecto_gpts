import { Schema, model } from "mongoose";

const transferenciaSchema = new Schema({
    remitente: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Cuenta',
        required: true
    },
    destinatario: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Cuenta',
        required: true
    },
    cantidad: {
        type: Number,
        required: true
    },
    fecha: {
        type: Date,
        default: Date.now
    }
},
{
  timestamps: true,
  versionKey: false,
});

export default model('Transferencia', transferenciaSchema);