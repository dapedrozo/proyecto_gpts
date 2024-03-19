import { useState } from 'react';
import { useForm } from 'react-hook-form'

function Chat({updateConversacion}) {
    const { register, handleSubmit, formState: { errors }, reset } = useForm()
    const [isSubmitting, setIsSubmitting] = useState(false);

    const onSubmit = async (formData) => {
        try {
            const newFormData = formData
            reset();
            setIsSubmitting(true);
            await updateConversacion(newFormData)
            setIsSubmitting(false);
        } catch (error) {
            console.log(error);
        }
    }

    return (
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
        <div className="relative">
            <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex items-center">
            <textarea
            {...register('content', { required: true })}
            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2 border border-zinc-700 focus:outline-none focus:border-zinc-600 scroll-container"
            placeholder="Mensaje al asistente..."
            disabled={isSubmitting}
            maxLength={20000}
            rows="3"
          />
                {errors.content && <p className='text-red-500'>El mensaje es requerido</p>}
                <button type="submit" disabled={isSubmitting} className={`bg-zinc-700 hover:bg-zinc-500 text-white px-4 py-2 rounded-md ml-2`} >Enviar</button>
            </div>
            </form>
        </div>
        </>
    )
}

export default Chat