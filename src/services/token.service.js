const jwt = require('jsonwebtoken');
const moment = require('moment');
const httpStatus = require('http-status');

const ApiError = require('../utils/ApiError');
const config = require('../config');
const { tokenTypes } = require('../config/tokens');

// servicios
const { userService } = require('.');

// modelos
const { Token } = require('../models');

/**
 * Genera un token de autenticación
 * @param {ObjectId} userId
 * @param {Moment} expires
 * @param {string} type
 * @param {string} secret
 * @returns {string}
 */
const generateToken = (userId, expires, type, secret = config.jwt.secret) => {
  const payload = {
    sub: userId,
    iat: moment().unix(),
    exp: expires.unix(),
    type,
  };

  return jwt.sign(payload, secret);
};

/**
 * Guarda un token
 * @param {string} token
 * @param {ObjectId} userId
 * @param {Moment} expires
 * @param {string} type
 * @param {boolean} blacklisted
 * @returns {Promise<Token>}
 */
const saveToken = async (token, userId, expires, type, blacklisted = false) => {
  const tokenData = {
    token,
    user: userId,
    expires: expires.toDate(),
    type,
    blacklisted,
  };

  await Token.create(tokenData);
};

/**
 * Verifica si el token es válido
 * @param {string} token
 * @param {string} type
 * @returns {Promise<Token>}
 */
const verifyToken = async (token, type) => {
  const payload = jwt.verify(token, config.jwt.secret);

  const tokenDoc = await Token.findOne({
    token,
    type,
    user: payload.sub,
    blacklisted: false,
  });
  if (!tokenDoc) {
    throw new Error('Token no encontrado');
  }

  return tokenDoc;
};

/**
 * Genera tokens de autenticación necessarios para el inicio de sesión
 * @param {User} user
 * @returns {Promise<Object>}
 */
const generateAuthTokens = async (user) => {
  const accessTokenExpires = moment().add(
    config.jwt.accessExpirationMinutes,
    'minutes'
  );
  const accessToken = generateToken(
    user.id,
    accessTokenExpires,
    tokenTypes.ACCESS
  );

  const refreshTokenExpires = moment().add(
    config.jwt.refreshExpirationDays,
    'days'
  );
  const refreshToken = generateToken(
    user.id,
    refreshTokenExpires,
    tokenTypes.REFRESH
  );
  await saveToken(
    refreshToken,
    user.id,
    refreshTokenExpires,
    tokenTypes.REFRESH
  );

  return {
    access: {
      token: accessToken,
      expires: accessTokenExpires.toDate(),
    },
    refresh: {
      token: refreshToken,
      expires: refreshTokenExpires.toDate(),
    },
  };
};

/**
 * Devuelve un token de reseteo de contraseña
 * @param {string} email
 * @returns {Promise<string>}
 */
const generateResetPasswordToken = async (email) => {
  const user = await userService.getUserByEmail(email);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Usuario no encontrado');
  }

  const expiresIn = moment().add(
    config.jwt.resetPasswordExpirationMinutes,
    'minutes'
  );
  const resetPasswordToken = generateToken(
    user.id,
    expiresIn,
    tokenTypes.RESET_PASSWORD
  );
  await saveToken(
    resetPasswordToken,
    user.id,
    expiresIn,
    tokenTypes.RESET_PASSWORD
  );

  return resetPasswordToken;
};

module.exports = {
  verifyToken,
  generateAuthTokens,
  generateResetPasswordToken,
};
