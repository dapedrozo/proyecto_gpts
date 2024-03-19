import {useEffect} from 'react'
import { useForm } from 'react-hook-form'
import {useNavigate} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {useLoginMutation} from '../api/apiSlice'
import { loginToken, errorRegister, persistLocalStorage } from '../features/auth/authSlice'
import { privateRoutes } from '../routes/routes'

function LoginPage() {
    const { register, handleSubmit, formState: {errors} } = useForm()
    const dispatch = useDispatch()
    const {errors: signinErrors} = useSelector(state => state.auth)

    const navigate = useNavigate()
    const [login] = useLoginMutation() 

    const onSubmit = async (formData) =>{
        try {
            const token = await login(formData).unwrap()
            dispatch(loginToken(token))
            persistLocalStorage('token', token)
            navigate(`/${privateRoutes.DASHBOARD}`, {replace: true})
        } catch (error) {
            dispatch(errorRegister({error: error.data }))
        }
    }

    useEffect(()=>{
        if(signinErrors.length>0){
            const timer = setTimeout(()=>{
                dispatch(errorRegister({error: [] }))
            },1300)
            return ()=>clearTimeout(timer)
        }
    },[dispatch, signinErrors])

    return (
      <div className='flex h-[calc(100vh-100px)] items-center justify-center'>
        <div className='bg-zinc-800 max-w-md w-full p-10 rounded-md'>
            {
                signinErrors.map((error, i)=>(
                    <div className='bg-red-500 p-2 text-white text-center my-2' key={i}>{error}</div>
                ))
            }
            <h1 className='text-2xl font-bold'>Login</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
            <input type="email" {...register("email", { required: true })} className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2'
            placeholder='Email'/>
            {errors.email && <p className='text-red-500'>El email es requerido</p>}
            <input type="password" {...register("password", { required: true })} className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2'
            placeholder='Contraseña'/>
            {errors.password && <p className='text-red-500'>La contraseña es requerida</p>}
            <button className={`bg-zinc-900 hover:bg-zinc-500 text-white px-4 py-2 rounded-md`} type="submit">Login</button>
            </form>
            </div>
      </div>
    );
}

export default LoginPage