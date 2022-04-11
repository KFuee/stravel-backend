const httpStatus = require('http-status');

const ApiError = require('../utils/ApiError');

const { User } = require('../models');

const createUser = async (userBody) => {
  const isEmailTaken = await User.isEmailTaken(userBody.email);
  if (isEmailTaken) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Email en uso');
  }

  return User.create(userBody);
};

module.exports = {
  createUser,
};
