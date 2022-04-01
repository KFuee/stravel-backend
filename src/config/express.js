const express = require('express');
const httpStatus = require('http-status');

// config
const morgan = require('./morgan');

// middlewares
const { errorConverter, errorHandler } = require('../middlewares/error');

// utils
const ApiError = require('../utils/ApiError');

const app = express();

// use morgan
app.use(morgan.successHandler);
app.use(morgan.errorHandler);

// rutas api
app.get('/', (_req, res) => res.send('Hello World!'));

// error 404 si no encuentra ruta
app.use((_req, _res, next) => {
  const error = new ApiError(httpStatus.NOT_FOUND, 'Ruta no encontrada');
  next(error);
});

// convertir errores en ApiError si es necesario
app.use(errorConverter);

// manejar errores
app.use(errorHandler);

module.exports = app;
