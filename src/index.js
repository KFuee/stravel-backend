const mongoose = require('mongoose');

const app = require('./config/express');
const { port, mongoose: mongooseConfig } = require('./config');
const logger = require('./config/logger');

mongoose.connect(mongooseConfig.uri, mongooseConfig.options, (err) => {
  if (err) {
    logger.error(err);
    process.exit(1);
  }

  logger.info('Conectado a MongoDB');
  app.listen(port, () => logger.info(`Escuchando en el puerto ${port}`));
});
