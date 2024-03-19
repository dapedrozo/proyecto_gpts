import {Schema, model} from 'mongoose'
import bcrypt from 'bcryptjs'
import config from '../../config.js'
import jwt from 'jsonwebtoken'
const secretKey = config.JWTSECRET;

const userSchema = new Schema({
    nombre: {
      type: String,
      required: true,
      trim: true
    },
    empresa: {
      type: Schema.Types.ObjectId,
      ref: "Empresa",
      required: true
    },
    email: {
      type: String,
      unique: true,
      required: true,
      trim: true
    },
    numeroTelefono: {
      type:String,
      match: /^\d{10}$/,
      trim: true
    },
    imagenPerfil: String,
    password: {
      type: String,
      required: true
    },
    roles: {
      ref: "Role",
      type: Schema.Types.ObjectId,
      required: true
    },
    lastLogin: Date,
    estado: {
      type: String,
      enum: ["Activo", "Eliminado"],
      default: "Activo",
    }, 
  }, {
    timestamps: true,
    versionKey: false
  });

userSchema.statics.encryptPassword=async(password)=>{
    const salt = await bcrypt.genSalt(10)
    return await bcrypt.hash(password, salt)
}
userSchema.statics.comparePassword=async(password, receivedPassword)=>{
    return await bcrypt.compare(password, receivedPassword)
}
userSchema.statics.encryptFirstPasswordUser=(data)=>{
  const token = jwt.sign(data, secretKey)
  return token
}
userSchema.statics.decryptFistPasswordUser=(token)=>{
  try {
    const decodedData = jwt.verify(token, secretKey)
    return decodedData
  } catch (error) {
    return null
  }
}

export default model('User', userSchema)