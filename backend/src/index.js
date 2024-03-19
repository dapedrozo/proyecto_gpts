import app from './app.js'
import config from './config.js';
import './db.js';

const server = app.listen(config.PORTAPP, () => {
    console.log(">>> server on port: ", config.PORTAPP);
  });
  
server.keepAliveTimeout = 30 * 1000;
server.headersTimeout = 35 * 1000;