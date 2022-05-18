const httpStatus = require('http-status');

// utils
const catchAsync = require('../utils/catchAsync');

// models
const { HistoryRecord } = require('../models');

const getAllRecords = catchAsync(async (req, res) => {
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

module.exports = {
  getAllRecords,
  createRecord,
};
