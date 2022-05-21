const mongoose = require('mongoose');

// plugins
const { toJSON } = require('./plugins');

const favouriteSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    type: {
      type: String,
      enum: ['attraction', 'transportStop', 'transportLine'],
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
favouriteSchema.plugin(toJSON);

const Favourite = mongoose.model('Favourite', favouriteSchema);

module.exports = Favourite;
