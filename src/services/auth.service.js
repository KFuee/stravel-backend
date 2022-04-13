const httpStatus = require('http-status');

const ApiError = require('../utils/ApiError');
const { tokenTypes } = require('../config/tokens');

// servicios
const { userService } = require('.');

// modelos
const { Token } = require('../models');

/**
 * Inicia sesión con correo y contraseña
 * @param {string} email
 * @param {string} password
 * @returns {Promise<User>}
 */
const loginWithEmailAndPassword = async (email, password) => {
  const user = await userService.getUserByEmail(email);
  if (!user || !(await user.comparePassword(password))) {
    throw new ApiError(
      httpStatus.UNAUTHORIZED,
      'Email o contraseña incorrectos'
    );
  }

  return user;
};

/**
 * Cierra la sesión del usuario
 * @param {string} refreshToken
 * @returns {Promise}
 */
const logout = async (refreshToken) => {
  const refreshTokenDoc = await Token.findOne({
    token: refreshToken,
    type: tokenTypes.REFRESH,
    blacklisted: false,
  });
  if (!refreshTokenDoc) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Refresh token no encontrado');
  }

  await refreshTokenDoc.remove();
};

module.exports = {
  loginWithEmailAndPassword,
  logout,
};
