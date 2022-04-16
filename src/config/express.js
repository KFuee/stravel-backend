const express = require('express');
const passport = require('passport');
const helmet = require('helmet');
const xss = require('xss-clean');
const mongoSanitize = require('express-mongo-sanitize');
const compression = require('compression');
const cors = require('cors');
const httpStatus = require('http-status');

// config
const morgan = require('./morgan');
const passportStrategy = require('./passport');

// routes
const routes = require('../routes');

// middlewares
const { errorConverter, errorHandler } = require('../middlewares/error');

// utils
const ApiError = require('../utils/ApiError');

const app = express();

// use morgan
app.use(morgan.successHandler);
app.use(morgan.errorHandler);

// headers seguridad http
app.use(helmet());

// parsea el body de las peticiones json
app.use(express.json());

// parsea el body de las peticiones urlencoded
app.use(express.urlencoded({ extended: true }));

// limpia los datos de entrada
app.use(xss());
app.use(mongoSanitize());

// comprimir las respuestas con gzip
app.use(compression());

// permite que se puedan hacer peticiones desde cualquier origen
app.use(cors());
app.options('*', cors());

// autenticación jwt
app.use(passport.initialize());
passport.use('jwt', passportStrategy);

// rutas api v1
app.use('/v1', routes);

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
