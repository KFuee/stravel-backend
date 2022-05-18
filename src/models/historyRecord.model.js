const mongoose = require('mongoose');

// plugins
const { toJSON } = require('./plugins');

const historySchema = mongoose.Schema(
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
historySchema.plugin(toJSON);

const History = mongoose.model('HistoryRecord', historySchema);

module.exports = History;
