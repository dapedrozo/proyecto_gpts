import { useEffect } from "react"

function Threads({updateIdThread, idCurrentThread, threads}) {

  return (
    <div className="space-y-5">
        <button className={`px-3 w-full text-justify py-2 ${!idCurrentThread ? 'bg-zinc-600 rounded-md' : ''}`} onClick={()=>updateIdThread(null)}>
            Nueva conversación
        </button>
        {threads && threads.length > 0 ? (
            <div className="flex flex-col mb-4">
                {threads.map(thread => (
                    <button key={thread._id} className={`text-justify py-2 px-3 w-full ${thread._id === idCurrentThread ? 'bg-zinc-600 rounded-md' : ''}`} onClick={()=>updateIdThread(thread._id)}>
                        {thread.resumen}
                    </button>
                ))}
            </div> 
        ) : (
            <div className="">No hay conversaciones</div>
        )}
    </div>
    )
}

export default Threads