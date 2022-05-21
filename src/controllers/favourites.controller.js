const httpStatus = require('http-status');

// utils
const catchAsync = require('../utils/catchAsync');

// models
const { Favourite } = require('../models');

const getAllRecords = catchAsync(async (req, res) => {
  const { userId } = req.params;
  const { limit } = req.query;

  let userRecords;
  if (!limit) {
    userRecords = await Favourite.find({ userId });
  } else {
    userRecords = await Favourite.find({ userId }).limit(limit);
  }

  res.status(httpStatus.OK).send(userRecords);
});

const createRecord = catchAsync(async (req, res) => {
  const { userId, type, item } = req.body;

  const recordExists = await Favourite.findOne({ userId, type, item });
  if (recordExists) {
    return;
  }

  const newRecord = await Favourite.create({
    userId,
    type,
    item,
  });

  res.status(httpStatus.CREATED).send(newRecord);
});

const deleteAllRecords = catchAsync(async (req, res) => {
  const { userId } = req.params;

  await Favourite.deleteMany({ userId });

  res
    .status(httpStatus.OK)
    .send({ message: 'Todos los registros fueron eliminados' });
});

module.exports = {
  getAllRecords,
  createRecord,
  deleteAllRecords,
};
