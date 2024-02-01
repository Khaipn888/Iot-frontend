const mqtt = require('mqtt');
const Lamp = require('../models/Lamp');
const Room = require('../models/Room');
const { removeExist } = require('../utils');
const lamp = require('../middleware/lampMiddleware');
const broker = 'mqtt://broker.mqttdashboard.com:1883';
const options = {};
const topic = 'BINH.NB194231_SERVER';

const client = mqtt.connect(broker, options);

const lampController = {
  create: async (req, res) => {
    try {
      const { name, lampOrder, roomId } = req.body;

      const room = req.room;

      // check lampOrder exist
      const roomConnect = room.connectedLamp;

      var lamps = await Lamp.find({
        roomId: roomId,
      });

      // if (lamps) {
      //   for (const lamp of lamps) {
      //     if (lamp.name == name) {
      //       return res.status(400).send({
      //         result: 'fail',
      //         message: 'Tên đèn đã tồn tại',
      //       });
      //     }
      //   }
      // }

      for (var i = 0; i < roomConnect.length; i++) {
        if (roomConnect[i] == lampOrder) {
          return res.status(400).send({
            result: 'fail',
            message: 'Chân đèn đã tồn tại',
          });
        }
      }

      const newLamp = new Lamp({
        roomId: roomId,
        lampId: roomId + lampOrder.toString(),
        name: name,
        status: false,
        mode: 'manual',
        timerMode: [],
        autoMode: -1,
      });

      client.publish(
        topic,
        JSON.stringify({
          command: 'lamp-create',
          lampOrder: lampOrder,
          roomId: roomId,
        }),
        (err) => {
          if (err) {
            return console.log({
              result: 'failed',
              message: err.message,
            });
          } else {
            console.log({
              result: 'success',
              message: `Yêu cầu lamp-create: ${roomId} ${lampOrder} đã được gửi`,
            });
          }
        },
      );

      await newLamp.save();

      await Room.findOneAndUpdate(
        {
          roomId: roomId,
        },
        {
          connectedLamp: [...room.connectedLamp, lampOrder],
        },
      );

      return res.status(200).json({
        result: 'success',
        lamp: newLamp,
      });
    } catch (err) {
      return res.status(500).send({
        result: 'fail',
        message: err.message,
      });
    }
  },

  changeName: async (req, res) => {
    try {
      const { name, lampId } = req.body;

      if (!name) {
        return res.status(400).send({
          result: 'fail',
          message: 'thiếu tham số name',
        });
      }

      const lampAfter = await Lamp.findOneAndUpdate(
        {
          lampId: lampId,
        },
        {
          name: name,
        },
        { new: true },
      );

      console.log(lampAfter);

      res.status(200).send({
        result: 'success',
        lamp: lampAfter,
      });
    } catch (err) {
      return res.status(500).send({
        result: 'fail',
        message: err.message,
      });
    }
  },

  changeMode: async (req, res) => {
    try {
      const { lampId, mode } = req.body;

      if (mode != 'manual' && mode != 'timer' && mode != 'auto') {
        return res.status(400).send({
          result: 'fail',
          message: 'mode không phải là một trong 3 TH: manual, timer, auto',
        });
      }

      //mqtt send change mode

      client.publish(
        topic,
        JSON.stringify({
          command: 'lamp-change-mode',
          mode: mode,
          lampOrder:
            parseInt(lampId.slice(17, 19)) > 9
              ? parseInt(lampId.slice(-2)).toString()
              : parseInt(lampId.slice(-1)).toString(),
          roomId:
            parseInt(lampId.slice(17, 19)) > 9
              ? lampId.slice(0, lampId.length - 2)
              : lampId.slice(0, lampId.length - 1),
        }),
        (err) => {
          if (err) {
            return console.log({
              result: 'failed',
              message: err.message,
            });
          } else {
            console.log({
              result: 'success',
              message: `Yêu cầu change-mode: ${mode} đã được gửi`,
            });
          }
        },
      );

      await Lamp.findOneAndUpdate(
        {
          lampId: lampId,
        },
        {
          mode: mode,
        },
      );

      res.status(200).send({
        result: 'success',
        message: `lamp-change-mode thành công: ${mode}: ${lampId}`,
      });
    } catch (err) {
      return res.status(500).send({
        result: 'fail',
        message: err.message,
      });
    }
  },

  controlManual: async (req, res) => {
    try {
      const { lampId, control } = req.body;
      client.publish(
        topic,
        JSON.stringify({
          command: 'lamp-control-manual',
          control: control.toString(),
          lampOrder:
            parseInt(lampId.slice(17, 19)) > 9
              ? parseInt(lampId.slice(-2)).toString()
              : parseInt(lampId.slice(-1)).toString(),
          roomId:
            parseInt(lampId.slice(17, 19)) > 9
              ? lampId.slice(0, lampId.length - 2)
              : lampId.slice(0, lampId.length - 1),
        }),
        (err) => {
          if (err) {
            return console.log({
              result: 'failed',
              message: err.message,
            });
          } else {
            console.log({
              result: 'success',
              message: `Yêu cầu lamp-control-manual: ${control}: ${
                parseInt(lampId.slice(17, 19)) > 9
                  ? parseInt(lampId.slice(-2))
                  : parseInt(lampId.slice(-1))
              } đã được gửi`,
            });
          }
        },
      );

      await Lamp.findOneAndUpdate({ lampId: lampId }, { status: control });
      res.status(200).send({
        result: 'success',
        message: `Yêu cầu điều khiển đèn đã được gửi: ${control}`,
      });
    } catch (err) {
      return res.status(500).send({
        result: 'fail',
        message: err.message,
      });
    }
  },

  changeAutoModeBreakpoint: async (req, res) => {
    try {
      const { lampId, breakpoint } = req.body;
      client.publish(
        topic,
        JSON.stringify({
          command: 'lamp-control-change-breakpoint',
          breakpoint: breakpoint.toString(),
          lampOrder:
            parseInt(lampId.slice(17, 19)) > 9
              ? parseInt(lampId.slice(-2)).toString()
              : parseInt(lampId.slice(-1)).toString(),
          roomId:
            parseInt(lampId.slice(17, 19)) > 9
              ? lampId.slice(0, lampId.length - 2)
              : lampId.slice(0, lampId.length - 1),
        }),
        (err) => {
          if (err) {
            return console.log({
              result: 'failed',
              message: err.message,
            });
          } else {
            console.log({
              result: 'success',
              message: `Yêu cầu lamp-control-change-breakpoint: ${breakpoint}: ${lampId} đã được gửi`,
            });
          }
        },
      );
      await Lamp.findOneAndUpdate({ lampId: lampId }, { breakpoint: breakpoint });
      res.status(200).send({
        result: 'success',
        message: `Thay đổi breakpoint thành công: ${breakpoint}`,
      });
    } catch (err) {
      return res.status(500).send({
        result: 'fail',
        message: err.message,
      });
    }
  },

  changeTimers: async (req, res) => {
    try {
      const { lampId, timers } = req.body;
      client.publish(
        topic,
        JSON.stringify({
          command: 'lamp-control-change-timer',
          timers: timers.toString(),
          lampOrder:
            parseInt(lampId.slice(17, 19)) > 9
              ? parseInt(lampId.slice(-2)).toString()
              : parseInt(lampId.slice(-1)).toString(),
          roomId:
            parseInt(lampId.slice(17, 19)) > 9
              ? lampId.slice(0, lampId.length - 2)
              : lampId.slice(0, lampId.length - 1),
        }),
        (err) => {
          if (err) {
            return console.log({
              result: 'failed',
              message: err.message,
            });
          } else {
            console.log({
              result: 'success',
              message: `Yêu cầu lamp-control-change-timer: ${timers}: ${lampId} đã được gửi`,
            });
          }
        },
      );
      await Lamp.findOneAndUpdate({ lampId: lampId }, { timers: timers });
      res.status(200).send({
        result: 'success',
        message: `Thay đổi timers thành công: ${timers}`,
      });
    } catch (err) {
      return res.status(500).send({
        result: 'fail',
        message: err.message,
      });
    }
  },

  delete: async (req, res) => {
    try {
      const { lampId } = req.body;
      const room = req.room;

      const lampOrder =
        parseInt(lampId.slice(17, 19)) > 9
          ? parseInt(lampId.slice(-2))
          : parseInt(lampId.slice(-1));
      client.publish(
        topic,
        JSON.stringify({
          command: 'lamp-delete',
          lampOrder: lampOrder,
          roomId: room.roomId,
        }),
        (err) => {
          if (err) {
            return console.log({
              result: 'failed',
              message: err.message,
            });
          } else {
            console.log({
              result: 'success',
              message: `Yêu cầu lamp-delete: ${room.roomId} ${lampOrder} đã được gửi`,
            });
          }
        },
      );
      await Lamp.deleteOne({
        lampId: lampId,
      });
      await Room.findOneAndUpdate(
        {
          roomId: room.roomId,
        },
        {
          connectedLamp: removeExist(room.connectedLamp, lampOrder),
        },
      );
      res.status(200).send({
        result: 'success',
        message: `Xoá đèn thành công: ${lampId}`,
      });
    } catch (err) {
      return res.status(500).send({
        result: 'fail',
        message: err.message,
      });
    }
  },
};

module.exports = lampController;
