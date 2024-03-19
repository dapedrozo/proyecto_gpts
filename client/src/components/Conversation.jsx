import {v4 as uuid} from 'uuid'
import ReactMarkdown from 'react-markdown'

function Conversation({conversacion}) {
  return (
    <div className="mt-4">
      {conversacion.length > 0 ? (
        <div >
          {conversacion.map((element) => (
            <div key={uuid()} className="flex justify-between border-b-2 border-zinc-700 py-4">
                <div className={`text-md ml-auto font-bold`}>
                {element.roleConversacion === "usuario" ? 'Tú:' : 'Asistente:'}
                </div>

                <div className="max-w-[80%] min-w-[80%] ml-4">
                <ReactMarkdown>{element.contenido}</ReactMarkdown>
                </div>
            </div>
          ))}
        </div>
      ) : (
          <div className='font-bold text-center w-full max-h-[calc(100vh-15rem)] min-h-[calc(100vh-15rem)] py-2'>Envía un mensaje para iniciar una conversacion</div>
      )}
    </div>
  );
}

export default Conversation