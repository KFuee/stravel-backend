const httpStatus = require('http-status');

const ApiError = require('../utils/ApiError');

const { userService } = require('.');

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

module.exports = {
  loginWithEmailAndPassword,
};
