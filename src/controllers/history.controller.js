const httpStatus = require('http-status');

// utils
const catchAsync = require('../utils/catchAsync');
const ApiError = require('../utils/ApiError');

// models
const { HistoryRecord } = require('../models');

const getAllRecords = catchAsync(async (_req, res) => {
  const records = await HistoryRecord.find();
  res.status(httpStatus.OK).json(records);
});

const getAllUserRecords = catchAsync(async (req, res) => {
  const { userId } = req.params;
  const { limit } = req.query;

  let userRecords;
  if (!limit) {
    userRecords = await HistoryRecord.find({ userId });
  } else {
    userRecords = await HistoryRecord.find({ userId }).limit(limit);
  }

  res.status(httpStatus.OK).send(userRecords);
});

const getUserRecord = catchAsync(async (req, res) => {
  const { id } = req.params;
  const record = await HistoryRecord.findById(id);

  if (!record) {
    throw new ApiError(httpStatus.NOT_FOUND, 'No se encontró el registro');
  }

  res.status(httpStatus.OK).send(record);
});

const createRecord = catchAsync(async (req, res) => {
  const { userId, type, item } = req.body;

  const recordExists = await HistoryRecord.findOne({ userId, type, item });
  if (recordExists) {
    return;
  }

  const newRecord = await HistoryRecord.create({
    userId,
    type,
    item,
  });

  res.status(httpStatus.CREATED).send(newRecord);
});

const deleteRecord = catchAsync(async (req, res) => {
  const { userId, recordId } = req.params;

  const record = await HistoryRecord.findOneAndDelete({
    user: userId,
    record: recordId,
  });

  if (!record) {
    throw new ApiError(httpStatus.NOT_FOUND, 'No se encontró el registro');
  }

  await HistoryRecord.findByIdAndDelete(recordId);

  res.status(httpStatus.OK).send(record);
});

const deleteAllRecords = catchAsync(async (req, res) => {
  const { userId } = req.params;

  await HistoryRecord.deleteMany({ userId });

  res
    .status(httpStatus.OK)
    .send({ message: 'Todos los registros fueron eliminados' });
});

module.exports = {
  getAllRecords,
  getAllUserRecords,
  getUserRecord,
  createRecord,
  deleteRecord,
  deleteAllRecords,
};
