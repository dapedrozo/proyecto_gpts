import { Link, redirect } from "react-router-dom"
import { privateRoutes, publicRoutes } from "../routes/routes"
import { useDispatch, useSelector } from 'react-redux'
import { logoutUser, errorRegister } from '../features/auth/authSlice'
import { useLogoutMutation } from '../api/apiSlice'

function Navbar() {
    const dispatch = useDispatch()
    const authState = useSelector(state => state.auth)
    const [logout] = useLogoutMutation();

    const primerNombre = (nombres) => {
        const firstName = nombres.split(" ")
        return firstName[0]
    }

    const logOut = async () => {
        try {
            await logout()
            dispatch(logoutUser())
            return redirect(`/${publicRoutes.LOGIN}`)
        } catch (error) {
            dispatch(errorRegister({ error: error.data }))
        }
    }

    return (
        <>
            {
                authState?.user?.nombre ? (
                    <nav className="bg-zinc-700 flex justify-between py-5 px-10">
                        <Link to={`/${privateRoutes.DASHBOARD}`}>
                            <h1 className="text-2xl font-bold">Inicio</h1>
                        </Link>
                        <ul className="flex gap-x-2">
                            <li className="px-5">
                                {primerNombre(authState.user.nombre)}
                            </li>
                            <li className={`bg-zinc-800 hover:bg-zinc-600 text-white px-4 rounded-md cursor-pointer`} onClick={logOut}>
                                Logout
                            </li>
                        </ul>
                    </nav>
                ) : (
                    <>
                    </>
                )
            }
        </>
    )
}

export default Navbar