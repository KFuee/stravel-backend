const httpStatus = require('http-status');

const ApiError = require('../utils/ApiError');

// modelos
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
 * Obtiene usuario por id
 * @param {ObjectId} id
 * @returns {Promise<User>}
 */
const getUserById = async (id) => User.findById(id);

/**
 * Obtiene usuario por email
 * @param {string} email
 * @returns {Promise<User>}
 */
const getUserByEmail = async (email) => User.findOne({ email });

const updateUserById = async (id, userBody) => {
  const user = await getUserById(id);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Usuario no encontrado');
  }

  if (userBody.email && (await User.isEmailTaken(userBody.email, id))) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Email en uso');
  }

  Object.assign(user, userBody);
  await user.save();
  return user;
};

module.exports = {
  createUser,
  getUserById,
  getUserByEmail,
  updateUserById,
};
