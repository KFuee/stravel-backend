const app = require('./config/express');
const { port } = require('./config');
const logger = require('./config/logger');

app.listen(port, () => logger.info(`Escuchando en el puerto ${port}`));
