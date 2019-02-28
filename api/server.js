'use strict';

const app = require('./app');
const http = require('http');
const config = require('../config');
const morgan = require('morgan');

app.set('port', config.server.port);

app.use(morgan('combined', {stream: config.winston.stream}));

const server = http.createServer(app);

server.listen(config.server.port);
server.on('error', onError);
server.on('listening', onListening);

function onError(error) {
  config.logger.log('error', JSON.stringify(error));

  if (error.syscall !== 'listen') {
    throw error;
  }

  let bind = typeof config.server.port === 'string'
    ? 'Pipe ' + config.server.port
    : 'Port ' + config.server.port;

  switch (error.code) {
    case 'EACCES':
      config.logger.log('error', bind + ' requires elevated privileges');
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      config.logger.log('error', bind + ' is already in use');
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

function onListening() {
  let addr = server.address();
  let bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + config.server.port;
  config.logger.log('info', 'Listening on ' + bind);
}
