const express = require('express');

const morgan = require('./config/morgan');
const logger = require('./config/logger');

const app = express();
const port = 3000;

// use morgan
app.use(morgan.successHandler);
app.use(morgan.errorHandler);

app.get('/', (_req, res) => res.send('Hello World!'));

app.listen(port, () => logger.info(`Escuchando en el puerto ${port}`));
