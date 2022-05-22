const httpStatus = require('http-status');

// utils
const catchAsync = require('../utils/catchAsync');

// services
const { userService } = require('../services');

const getUser = catchAsync(async (req, res) => {
  const { id } = req.params;
  const user = await userService.getUserById(id);

  res.status(httpStatus.OK).send(user);
});

const getUsers = catchAsync(async (_req, res) => {
  const users = await userService.getUsers();

  res.status(httpStatus.OK).send(users);
});

const updateUser = catchAsync(async (req, res) => {
  const { id } = req.params;
  const user = await userService.updateUserById(id, req.body);

  res.status(httpStatus.OK).send(user);
});

const deleteUser = catchAsync(async (req, res) => {
  const { id } = req.params;
  const user = await userService.deleteUserById(id);

  res.status(httpStatus.OK).send(user);
});

module.exports = {
  getUser,
  getUsers,
  updateUser,
  deleteUser,
};
