import {Link} from 'react-router-dom'
import {useSelector} from 'react-redux'
import {useGetAsistentesQuery} from '../api/apiSlice'
import { privateRoutes } from '../routes/routes'

function HomePage() {
  const authState = useSelector(state => state.auth)
  const {data, isLoading} = useGetAsistentesQuery(authState.user?.empresa?._id)
  
  return (
    <div>
    <div className='flex h-[calc(100vh-100px)] items-start justify-center p-4 m-4'>
      {data ? (
        <div className='bg-zinc-800 max-w-md w-fit p-10 rounded-md text-center'>
          {data.map((element, index)=>(
            <div key={index}>
              <div className='text-2xl font-bold mb-5' key={element._id}>{element.nombre}</div>
              <Link className={`bg-zinc-700 hover:bg-zinc-500 text-white px-4 py-2 rounded-md ml-2`} to={`/${privateRoutes.CONVERSACIONES}/${element._id}`}>iniciar el asistente</Link>
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