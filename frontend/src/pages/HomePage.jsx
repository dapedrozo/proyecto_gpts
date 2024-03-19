import {Link} from 'react-router-dom'
import {useSelector} from 'react-redux'
import {useGetAsistentesQuery} from '../api/apiSlice'
import { privateRoutes } from '../routes/routes'

function HomePage() {
  const authState = useSelector(state => state.auth)
  const {data, isLoading} = useGetAsistentesQuery(authState.user?.empresa?._id)
  
  return (
    <div>
    <div className='flex flex-wrap justify-center p-4 m-4'>
      {data ? (
        <div className='flex flex-wrap justify-center p-4 m-4'>
        {data.map((element, index) => (
          <div key={index} className='flex flex-col items-center p-6 m-4 bg-zinc-800 max-w-md rounded-md text-center'>
            <div className='text-3xl font-bold mb-6'>{element.nombre}</div>
            <Link className='bg-zinc-700 hover:bg-zinc-500 text-white px-6 py-3 rounded-md ml-3' to={`/${privateRoutes.CONVERSACIONES}/${element._id}`}>
              Iniciar el asistente
            </Link>
          </div>
        ))}
      </div>
      ) : isLoading ? (
        <div>cargado......</div>
      ) : (
        <div>estamos presentando dificultades</div>
      )}
    </div>
    </div>
  )
}

export default HomePage