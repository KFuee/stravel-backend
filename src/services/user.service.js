const httpStatus = require('http-status');

const ApiError = require('../utils/ApiError');

const { User } = require('../models');

/**
 * Crea un usuario
 * @param {Object} userBody
 * @returns {Promise<User>}
 */
const createUser = async (userBody) => {
  const isEmailTaken = await User.isEmailTaken(userBody.email);
  if (isEmailTaken) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Email en uso');
  }

  return User.create(userBody);
};

/**
 * Obtiene usuario por email
 * @param {string} email
 * @returns {Promise<User>}
 */
const getUserByEmail = async (email) => User.findOne({ email });

module.exports = {
  createUser,
  getUserByEmail,
};
