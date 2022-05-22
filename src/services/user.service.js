const httpStatus = require('http-status');

const ApiError = require('../utils/ApiError');

// models
const { User, HistoryRecord, Favourite } = require('../models');

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
const getUserById = async (id) => {
  const user = await User.findById(id);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Usuario no encontrado');
  }

  const historyCount = await HistoryRecord.count({ userId: id });
  const favouriteCount = await Favourite.count({ userId: id });

  return {
    ...user.toJSON(),
    historyCount,
    favouriteCount,
  };
};

/**
 * Obtiene usuario por email
 * @param {string} email
 * @returns {Promise<User>}
 */
const getUserByEmail = async (email) => User.findOne({ email });

/**
 * Obtiene todos los usuarios
 * @returns {Promise<User[]>}
 */
const getUsers = async () => User.find();

/**
 * Actualiza un usuario
 * @param {ObjectId} id
 * @param {Object} userBody
 * @returns {Promise<User>}
 */
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

/**
 * Elimina un usuario
 * @param {ObjectId} id
 * @returns {Promise<User>}
 */
const deleteUserById = async (id) => {
  const user = await getUserById(id);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Usuario no encontrado');
  }

  await user.remove();
  return user;
};

module.exports = {
  createUser,
  getUserById,
  getUserByEmail,
  getUsers,
  updateUserById,
  deleteUserById,
};
