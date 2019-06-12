/* eslint-disable no-console */
const logger = require('./logger');
const app = require('./app');
const port = app.get('port');
const server = app.listen(port);

process.on('unhandledRejection', (reason, p) =>
  logger.error('Unhandled Rejection at: Promise ', p, reason)
);

server.on('listening', () => {
    let log_port;

    if( port === '' ) {
      log_port = "";
    }
    else {
      log_port = ":"+port;
    }

    logger.info('Feathers application started on %s://%s%s', app.get('scheme'), app.get('host'), log_port)
  }
);
