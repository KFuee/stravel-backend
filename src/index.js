const express = require('express');

const logger = require('./config/logger');

const app = express();
const port = 3000;

app.get('/', (_req, res) => res.send('Hello World!'));

app.listen(port, () => logger.info(`Escuchando en el puerto ${port}`));
