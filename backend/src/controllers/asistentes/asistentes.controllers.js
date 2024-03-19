import OpenAI from "openai";
import Asistente from "../../models/asistentes/Asistente.js";
import Empresa from "../../models/usuarios/Empresa.js";
import Thread from '../../models/asistentes/Thread.js'

export const getAsistentes = async (req, res) => {
    try {
        const { idEmpresa } = req.params;
        const empresa = await Empresa.findById(idEmpresa).populate({
            path: "asistentes",
            select: "_id nombre"
          })
        res.status(200).json(empresa.asistentes)
    } catch (error) {
        res.status(500).json({ error: "Error al obtener los permisos" })
    }
    };

export const getThreads = async (req, res) => {
try {
    const { id } = req.params;
    const asistente = await Asistente.findById(id).populate({
        path: "threads",
        select: "_id nombre resumen"
      })
    const threads = asistente.threads
    res.status(200).json(threads)
} catch (error) {
    res.status(500).json({ error: "Error al obtener los permisos" })
}
};

export const getConversacion = async (req, res) => {
    try {
        const { id } = req.params;
        const conversacion = await Thread.findById(id)
        res.status(200).json(conversacion.conversaciones)
    } catch (error) {
        res.status(500).json({ error: "Error al obtener los permisos" })
    }
    };

export const createThread = async (req, res) => {
try {    
    const { idAsistente, content } = req.body;
    const empresa = await Empresa.findOne({identificacion: req.user.empresa.identificacion})
    if(!empresa) res.status(400).json({ message: "no se encontro una llave disponible para tu empresa" })
    const openai = new OpenAI({ apiKey: empresa.apikey })
    const asistente = await Asistente.findById(idAsistente)
    if(!asistente) res.status(400).json({ message: "no se encontro el asistente" })
    const thread = await openai.beta.threads.create()
    await openai.beta.threads.messages.create(
        thread.id,
        { role: "user", content }
    )
    const run = await openai.beta.threads.runs.create(
        thread.id, { 
            assistant_id: asistente.idAsistente, 
            instructions: `El usuario se llama: ${req.user.nombre}, puedes usar su primer nombre preferiblemente y no es necesario que lo uses siempre, el usuario tiene una cuenta premium intenta que la respuesta sea lo mas detallada y acertada posible`
        }
    )
    while(true){
        const runStatus = await openai.beta.threads.runs.retrieve(
            thread.id,
            run.id
          );
        if (runStatus.status==="completed") break
        await new Promise(resolve=>setTimeout(resolve, 1500)) 
    }
    const messages = await openai.beta.threads.messages.list(
        thread.id
      );
    const ultimoMensaje = messages.data[0].content[0].text.value
    let textoCortado = content.substring(0, 20);
    if (content.length > textoCortado.length) {
        textoCortado += "...";
    }
    const newThread = new Thread({
        idThread: thread.id,
        resumen: textoCortado,
        conversaciones: [
            { roleConversacion: 'usuario', contenido: content },
            { roleConversacion: 'asistente', contenido: ultimoMensaje }
          ]
    })
    const idThread = await newThread.save();
    asistente.threads.push(idThread._id)
    await asistente.save()
    res.status(201).json({ message: ultimoMensaje, thread:idThread._id })
} catch (error) {
    return res.status(500).json({message: error})
}
};

export const continueThread = async (req, res) => {
    try {    
        const { threadId } = req.params
        const { idAsistente, content } = req.body;
        const empresa = await Empresa.findOne({identificacion: req.user.empresa.identificacion})
        if(!empresa) res.status(400).json({ message: "no se encontro una llave disponible para tu empresa" })
        const threadFound = await Thread.findById(threadId)
        if(!threadFound) res.status(400).json({ message: "no se encontro tu conversacion" })
        const openai = new OpenAI({ apiKey: empresa.apikey })
        const asistente = await Asistente.findById(idAsistente)
        await openai.beta.threads.messages.create(
            threadFound.idThread,
            { role: "user", content }
        )
        const run = await openai.beta.threads.runs.create(
            threadFound.idThread, { 
                assistant_id: asistente.idAsistente, 
                instructions: `El usuario se llama: ${req.user.nombre}, puedes usar su primer nombre preferiblemente y no es necesario que lo uses siempre, el usuario tiene una cuenta premium intenta que la respuesta sea lo mas detallada y acertada posible`
            }
        )
        while(true){
            const runStatus = await openai.beta.threads.runs.retrieve(
                threadFound.idThread,
                run.id
              );
            if (runStatus.status==="completed") break
            await new Promise(resolve=>setTimeout(resolve, 1500)) 
        }
        const messages = await openai.beta.threads.messages.list(
            threadFound.idThread
          );
        const ultimoMensaje = messages.data[0].content[0].text.value
        threadFound.conversaciones.push(
            { roleConversacion: 'usuario', contenido: content },
            { roleConversacion: 'asistente', contenido: ultimoMensaje }
        )
        await threadFound.save()
        res.status(201).json({ message: ultimoMensaje })
    } catch (error) {
        return res.status(500).json({message: error});
    }
};
    