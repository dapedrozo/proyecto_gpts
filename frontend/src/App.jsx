import {BrowserRouter, Route, Navigate} from 'react-router-dom'
import ProtectedRoute from './ProtectedRoute'
import { privateRoutes, publicRoutes } from './routes/routes'
import RoutesNotFound from './routes/RoutesNotFound'
import { Suspense, lazy, useEffect, useState } from 'react'
import Navbar from './components/Navbar'

const LoginPage = lazy(()=>import('./pages/LoginPage'))
const HomePage = lazy(()=>import('./pages/HomePage'))
const Conversaciones = lazy(()=>import('./pages/Conversaciones'))

function App() {
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);

  useEffect(() => {
    const handleResize = () => {
      setWindowHeight(window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <Suspense fallback={<>Cargando...</>}>
      <BrowserRouter>
        <div className="flex flex-col h-screen">
          <Navbar/>
            <RoutesNotFound>
            <Route path='/' element={<Navigate to={privateRoutes.DASHBOARD}/>} />
              <Route element={<ProtectedRoute />}>
                <Route path={publicRoutes.LOGIN} element={<LoginPage/>} />
                <Route path={privateRoutes.DASHBOARD} element={<HomePage/>} />
                <Route path={`${privateRoutes.CONVERSACIONES}/:id`} element={<Conversaciones/>} />
              </Route>
            </RoutesNotFound>
        </div>
        </BrowserRouter>
    </Suspense>
  )
}

export default App