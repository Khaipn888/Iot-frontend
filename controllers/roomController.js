const User = require('../models/User');
const Room = require('../models/Room');
const { isObjectNull } = require('../utils/index');
const Lamp = require('../models/Lamp');
const Window = require('../models/Window');

const roomController = {
  createRoom: async (req, res) => {
    try {
      const { name, roomId } = req.body;

      // check variable
      if (name == '' || roomId == '' || isObjectNull(name) || isObjectNull(roomId)) {
        return res.status(400).send({
          result: 'fail',
          message: 'thiếu name hoặc roomId',
        });
      }

      // user from auth middleware
      const user = req.user;

      // kiểm tra tên và ID của phòng đã tồn tại trong tài khoản này chưa
      const rooms = await Room.find({
        user: user.id,
      });

      for (var i = 0; i < rooms.length; i++) {
        if (rooms[i].name === name || rooms[i].roomId == roomId) {
          return res.status(400).send({
            result: 'fail',
            message: 'name hoặc roomId đã tồn tại',
          });
        }
      }

      const newRoom = new Room({
        user: user.id,
        roomId: roomId,
        name: name,
        connectedLamp: [],
        connectedWindow: [],
        humidity: null,
        temperature: null,
        lightIntensity: null,
      });

      await newRoom.save();

      await newRoom.populate('user');

      return res.json({
        result: 'success',
        room: newRoom,
      });
    } catch (err) {
      res.status(500).send({
        result: 'fail',
        message: err.message,
      });
    }
  },
  getAll: async (req, res) => {
    try {
      const user = req.user;
      const rooms = await Room.find({
        user: user.id,
      });

      return res.status(200).json({
        result: 'success',
        rooms: rooms,
      });
    } catch (err) {
      res.status(500).send({
        result: 'fail',
        message: err.message,
      });
    }
  },

  detail: async (req, res) => {
    try {
      const room = req.room;
      const lamps = await Lamp.find({
        roomId: room.roomId,
      });
      const windows = await Window.find({
        roomId: room.roomId,
      });

      return res.status(200).json({
        result: 'success',
        data: {
          room: room,
          lamps: lamps,
          windows: windows,
        },
      });
    } catch (err) {
      res.status(500).send({
        result: 'fail',
        message: err.message,
      });
    }
  },
  update: async (req, res) => {
    try {
      const { name, roomId } = req.body;

      if (name === '' || isObjectNull(name)) {
        return res.status(400).send({
          result: 'fail',
          message: 'Không đủ tham số name',
        });
      }

      const room = await Room.findOneAndUpdate(
        {
          roomId: roomId,
        },
        {
          name: name,
        },
        {
          new: true,
        },
      );

      return res.send({
        result: 'success',
        room: room,
      });
    } catch (err) {
      res.status(500).send({
        result: 'fail',
        message: err.message,
      });
    }
  },
  delete: async (req, res) => {
    try {
      const roomId = req.body.roomId;

      await Room.findOneAndDelete({ roomId: roomId });

      return res.send({
        result: 'success',
      });
    } catch (err) {
      res.status(500).send({
        result: 'fail',
        message: err.message,
      });
    }
  },
  updateData: async (data) => {
    try {
      const { roomId, humidity, temperature, lightIntensity } = data;

      data = {
        roomId: 123,
        humidity: 123,
        temperature: 30,
      };
      await Room.findOneAndUpdate(
        {
          roomId: roomId,
        },
        {
          humidity: humidity,
          temperature: temperature,
          lightIntensity: lightIntensity,
        },
      );
    } catch (err) {
      console.log({
        result: 'fail',
        message: 'Không thể cập nhập dữ liệu cho phòng',
        reason: err.message,
      });
    }
  },
};

module.exports = roomController;
