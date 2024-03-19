import { useParams } from 'react-router-dom'
import {useGetConversacionMutation, useGetThreadQuery, useCreateConversacionMutation, useContinueConversacionMutation} from '../api/apiSlice'
import Conversation from '../components/Conversation'
import Chat from '../components/Chat'
import Threads from '../components/Threads'
import { useEffect, useRef, useState } from 'react'

function Conversaciones() {
  const { id } = useParams()
  localStorage.setItem('idAsistente', id)
  const conversationRef = useRef(null);

  const {data, isLoading, refetch} = useGetThreadQuery(localStorage.getItem('idAsistente'))
  const [conversacion, setConversacion] = useState([])
  const [idCurrentThread, setIdCurrentThread] = useState(null)

  const [getConversacion] = useGetConversacionMutation()
  const [createConversacion] = useCreateConversacionMutation()
  const [continueConversacion] = useContinueConversacionMutation()


    const updateConversacion = async (currentConversacion) => {
      const threadId = localStorage.getItem('threadId')==="null" ? null : localStorage.getItem('threadId')
      if(!threadId){
        const idAsistente = localStorage.getItem('idAsistente')
        currentConversacion.idAsistente = idAsistente
        const modifyContentObject = {
          roleConversacion: 'usuario',
          contenido: currentConversacion.content
        }
        setConversacion(prevConversacion => prevConversacion.concat(modifyContentObject));
        const { message, thread } = await createConversacion(currentConversacion).unwrap()
        await refetch()
        setIdCurrentThread(thread)
        const modifyResponseContentObject = {
          roleConversacion: 'asistente',
          contenido: message
        }
        setConversacion(prevConversacion => prevConversacion.concat(modifyResponseContentObject));
        localStorage.setItem('threadId', thread)
      } else {
        const idAsistente = localStorage.getItem('idAsistente')
        currentConversacion.idAsistente = idAsistente
        const modifyContentObject = {
          roleConversacion: 'usuario',
          contenido: currentConversacion.content
        }
        setConversacion(prevConversacion => prevConversacion.concat(modifyContentObject));
        const { message } = await continueConversacion({threadId, currentConversacion}).unwrap()
        const modifyResponseContentObject = {
          roleConversacion: 'asistente',
          contenido: message
        }
        setConversacion(prevConversacion => prevConversacion.concat(modifyResponseContentObject));
      }
    }

    const updateIdThread = async (threadId) =>{
      if(!threadId){
        setConversacion([])
        setIdCurrentThread(null)
        localStorage.setItem('threadId', null)
      } else {
        localStorage.setItem('threadId', threadId)
        setIdCurrentThread(threadId)
        const conversacionFound = await getConversacion(threadId).unwrap()
        setConversacion([...conversacionFound])
      }
    }

    useEffect(()=>{
      const getCurrentConversacion = async() =>{
        const conversacion = await getConversacion(localStorage.getItem('threadId')).unwrap()
        setConversacion(conversacion)
        setIdCurrentThread(localStorage.getItem('threadId'))
      }
      getCurrentConversacion()
    },[getConversacion])

    useEffect(() => {
      const scrollToBottom = () => {
        if (conversationRef.current) {
          conversationRef.current.scrollTop = conversationRef.current.scrollHeight;
        }
      };
      scrollToBottom();
    }, [conversacion]);

  return (
    <div className="flex h-full">
      {isLoading ? (
        <div>cargando......</div>
      ) : (
        <>
        <style>
        {`
          /* Estilo del scroll */
          .scroll-container::-webkit-scrollbar {
            width: 5px; /* Ancho del scroll */
          }

          /* Color de fondo del scroll */
          .scroll-container::-webkit-scrollbar-track {
            background: transparent;
          }

          /* Color de la barra del scroll */
          .scroll-container::-webkit-scrollbar-thumb {
            background-color: #888;
            border-radius: 5px;
          }

          /* Color de la barra del scroll al pasar el mouse sobre ella */
          .scroll-container::-webkit-scrollbar-thumb:hover {
            background-color: #555;
          }
        `}
      </style>
          <div className="bg-zinc-900 w-1/4 sm:w-1/6 p-4 overflow-y-auto">
            <Threads updateIdThread={updateIdThread} idCurrentThread={idCurrentThread} threads={data}/>
          </div>
          <div className="flex-grow p-4 overflow-y-auto">
            <div className="max-w-4xl mx-auto max-h-[calc(100vh-10rem)]">
              <div className="mb-3 max-h-[calc(100vh-13rem)] min-h-[calc(100vh-13rem)] overflow-y-auto scroll-container" ref={conversationRef}>
                <Conversation conversacion={conversacion}/>
              </div>
              <div className="sticky bottom-0">
                <Chat updateConversacion={updateConversacion}/>
              </div>
            </div> 
          </div>
        </>
      )}
    </div>
  )
}

export default Conversaciones