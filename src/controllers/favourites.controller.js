const httpStatus = require('http-status');

// utils
const catchAsync = require('../utils/catchAsync');

// models
const { Favourite } = require('../models');

const getAllRecords = catchAsync(async (_req, res) => {
  const records = await Favourite.find();
  res.status(httpStatus.OK).send(records);
});

const getAllUserRecords = catchAsync(async (req, res) => {
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

const checkIfFavourite = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { user } = req.query;

  const favourite = await Favourite.findOne({
    userId: user,
    'item.id': id,
  });

  res.status(httpStatus.OK).send({
    message: !favourite
      ? 'Elemento no encontrado en favoritos'
      : 'Elemento encontrado en favoritos',
  });
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

const deleteRecord = catchAsync(async (req, res) => {
  const { userId, recordId } = req.params;

  const record = await Favourite.findOneAndDelete({
    user: userId,
    record: recordId,
  });

  if (!record) {
    return res.status(httpStatus.NOT_FOUND).send({
      message: 'No se encontró el registro',
    });
  }

  return res.status(httpStatus.OK).send(record);
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
  getAllUserRecords,
  checkIfFavourite,
  createRecord,
  deleteRecord,
  deleteAllRecords,
};
