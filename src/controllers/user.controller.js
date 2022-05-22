const httpStatus = require('http-status');

// utils
const catchAsync = require('../utils/catchAsync');
const ApiError = require('../utils/ApiError');

// services
const { userService } = require('../services');

const getUser = catchAsync(async (req, res) => {
  const { id } = req.params;
  const user = await userService.getUserById(id);

  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Usuario no encontrado');
  }

  res.status(httpStatus.OK).send(user);
});

const getUsers = catchAsync(async (req, res) => {
  const users = await userService.getUsers();

  res.status(httpStatus.OK).send(users);
});

const deleteUser = catchAsync(async (req, res) => {
  const { id } = req.params;
  const user = await userService.deleteUserById(id);

  res.status(httpStatus.OK).send(user);
});

module.exports = {
  getUser,
  getUsers,
  deleteUser,
};
