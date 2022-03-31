const express = require('express');

// config
const morgan = require('./config/morgan');
const logger = require('./config/logger');

// middlewares
const ignoreFavicon = require('./middlewares/ignoreFavicon');

const app = express();
const port = 3000;

// use morgan
app.use(morgan.successHandler);
app.use(morgan.errorHandler);

// use middlewares
app.use(ignoreFavicon);

app.get('/', (_req, res) => res.send('Hello World!'));

app.listen(port, () => logger.info(`Escuchando en el puerto ${port}`));
