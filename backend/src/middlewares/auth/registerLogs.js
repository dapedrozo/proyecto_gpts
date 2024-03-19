import Log from '../../models/authorization/Log.js'

export const registerLogs = async (req, res, next) => {
    try {
        const log = new Log({
            registradoPor: req.user ? req.user._id : undefined,
            method: req.method,
            url: req.originalUrl,
            requestHeaders: req.headers,
            requestBody: req.body ? req.body : undefined,
            ipClient: req.ip ? req.ip : undefined,
            });
            //registrar el response
            /*
             res.on('finish', async () => {
                log.responseStatus = res.statusCode;
                log.responseHeaders = res.getHeaders();
            });*/
        await log.save();
        next();
    } catch (error) {
        return res.status(500).json({ error: "Ocurrió al guardar el registro del log." });
    }
  };