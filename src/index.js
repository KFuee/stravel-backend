const mongoose = require('mongoose');

const app = require('./config/express');
const { port, mongoose: mongooseConfig } = require('./config');
const logger = require('./config/logger');

let server;
mongoose.connect(mongooseConfig.uri, mongooseConfig.options).then(() => {
  logger.info('Conectado a MongoDB');
  server = app.listen(port, () =>
    logger.info(`Escuchando en el puerto ${port}`)
  );
});

const exitHandler = () => {
  if (server) {
    server.close(() => {
      logger.info('Cerrando el servidor Express');
    });
  }

  process.exit(1);
};

const unexpectedErrorHandler = (err) => {
  logger.error(err);
  exitHandler();
};

process.on('uncaughtException', unexpectedErrorHandler);
process.on('unhandledRejection', unexpectedErrorHandler);
