import {z} from 'zod'

export const registerSchema = z.object({
    email: z.string({
        required_error: "Email is required"
    }).email({
        message: "Invalid Email"
    }),
    password: z.string({
        required_error: "Password is required" 
    }).min(6, {
        message: "La contraseña debe tener minimo 6 caracteres"
    })
})

export const loginSchema = z.object({
    email: z.string({
        required_error: "El email es requerido"
    }).email({
        message: "Email no valido"
    }),
    password: z.string({
        required_error: "La contraseña es requerida" 
    }).min(3, {
        message: "La contraseña debe tener minimo 6 caracteres"
    })
})