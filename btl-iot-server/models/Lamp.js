const mongoose = require('mongoose');

const Lamp = new mongoose.Schema(
  {
    lampId: {
      type: String,
      require: true,
    },
    name: {
      type: String,
    },
    roomId: String,
    status: {
      type: Boolean,
      default: false,
    },
    mode: {
      type: String,
      enum: ['manual', 'timer', 'auto'],
      default: 'manual',
    },

    timers: [],
    breakpoint: {
      type: Number,
      default: -1,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model('lamp', Lamp);
