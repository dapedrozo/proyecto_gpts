import {Navigate, Outlet, useLocation} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import {privateRoutes, publicRoutes} from './routes/routes'
import {useVerifyTokenMutation} from './api/apiSlice'
import {logoutUser, loginToken, loginUser, persistLocalStorage} from './features/auth/authSlice'
import { useEffect } from 'react'


const privateValidationFragment = <Outlet/>
const publicValidationFragment = <Navigate replace to={`/${privateRoutes.DASHBOARD}`} />
const loginValidationFragment = <Navigate replace to={`/${publicRoutes.LOGIN}`} />


function ProtectedRoute() {
    const authState = useSelector(state => state.auth)
    const { pathname } = useLocation()
    const isLoginPage = pathname === `/${publicRoutes.LOGIN}`

    const [verifyToken] = useVerifyTokenMutation()
    const dispatch = useDispatch()

    useEffect(() => {
        const verifyUser = async () =>{
            try {
                const token = localStorage.getItem('token')
                if(token){
                    dispatch(loginToken(token))
                    const data = await verifyToken().unwrap()
                    if(!data) {
                        dispatch(logoutUser())
                        return loginValidationFragment
                    }
                    dispatch(loginUser({data}))
                    persistLocalStorage('user',data)
                } 
                return loginValidationFragment
            } catch (error) {
                dispatch(logoutUser())
            }
        }
        verifyUser()
      }, [dispatch, verifyToken, pathname ])

    if (authState.token && isLoginPage) {
        return publicValidationFragment
    } else if (!authState.token && !isLoginPage) {
        return loginValidationFragment
    }
    return privateValidationFragment
}

export default ProtectedRoute