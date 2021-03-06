const mongoose = require('mongoose');

// plugins
const { toJSON } = require('./plugins');

const historyRecordSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    type: {
      type: String,
      enum: ['attraction', 'transport'],
      required: true,
    },
    item: {
      type: Object,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// plugins
historyRecordSchema.plugin(toJSON);

const HistoryRecord = mongoose.model('HistoryRecord', historyRecordSchema);

module.exports = HistoryRecord;
