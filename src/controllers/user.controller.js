// utils
const catchAsync = require('../utils/catchAsync');

// services
const { userService } = require('../services');

const getUsers = catchAsync(async (req, res) => {
  const users = await userService.getUsers();

  res.status(200).send(users);
});

module.exports = {
  getUsers,
};
