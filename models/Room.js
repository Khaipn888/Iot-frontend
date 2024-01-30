const mongoose = require('mongoose');

const Room = new mongoose.Schema(
  {
    roomId: {
      type: String,
      require: true,
      unique: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
    },
    name: String,
    connectedLamp: [],
    connectedWindow: [],
    humidity: Number,
    temperature: Number,
    lightIntensity: Number,
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model('room', Room);
