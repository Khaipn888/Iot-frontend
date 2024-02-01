const mqtt = require('mqtt');
const Window = require('../models/Window');
const Room = require('../models/Room');
const { removeExist, isObjectEmpty } = require('../utils');
const broker = 'mqtt://broker.mqttdashboard.com:1883';
const options = {};
const topic = 'BINH.NB194231_SERVER';

const client = mqtt.connect(broker, options);

const windowController = {
  create: async (req, res) => {
    try {
      const { name, windowOrder, roomId, height } = req.body;
      console.log(typeof height);
      if (name == '' || isObjectEmpty(name) || isObjectEmpty(height) || height == 0) {
        return res.status(400).send({
          result: 'fail',
          message: 'Sai kiểu dữ liệu ',
        });
      }

      var windows = await Window.find({
        roomId: roomId,
      });

      // if (windows) {
      //   for (const window of windows) {
      //     if (window.name == name) {
      //       return res.status(400).send({
      //         result: 'fail',
      //         message: 'Tên cửa sổ đã tồn tại',
      //       });
      //     }
      //   }
      // }

      const room = req.room;

      const roomConnect = room.connectedWindow;

      for (var i = 0; i < roomConnect.length; i++) {
        if (roomConnect[i] == windowOrder.toString()) {
          return res.status(400).send({
            result: 'fail',
            message: 'Chân cửa sổ hoặc sensor đã tồn tại',
          });
        }
      }

      const newWindow = new Window({
        roomId: roomId,
        windowId: roomId + windowOrder.toString(),
        name: name,
        status: 0,
        height: height,
        mode: 'manual',
        timerMode: [],
        autoMode: -1,
      });

      client.publish(
        topic,
        JSON.stringify({
          command: 'window-create',
          windownOrder: windowOrder,
          roomId: roomId,
          height: height,
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
              message: `Yêu cầu window-create: ${roomId} ${windowOrder}  đã được gửi`,
            });
          }
        },
      );

      await newWindow.save();

      await Room.findOneAndUpdate(
        {
          roomId: roomId,
        },
        {
          connectedWindow: [...room.connectedWindow, windowOrder],
        },
        {
          new: true,
        },
      );

      res.status(200).json({
        result: 'success',
        window: newWindow,
      });
    } catch (err) {
      return res.status(500).send({
        result: 'fail',
        message: err.message,
      });
    }
  },
  changeNameHeight: async (req, res) => {
    try {
      const window = req.window;
      const room = req.room;

      const name = req.body.name ?? window.name;
      const height = req.body.height ?? window.height;
      const windowId = req.body.windowId;

      if (!name && !height) {
        return res.status(400).send({
          result: 'fail',
          message: 'thiếu tham số name hoặc height',
        });
      }
      if (height) {
        client.publish(
          topic,
          JSON.stringify({
            command: 'window-change-height',
            roomId: room.roomId,
            windownOrder: parseInt(
              parseInt(windowId.slice(17, 19)) > 9
                ? parseInt(windowId.slice(-2)).toString()
                : parseInt(windowId.slice(-1)).toString(),
            ),
            height: height,
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
                message: `Yêu cầu window-change-height: ${room.roomId} ${windowId} đã được gửi`,
              });
            }
          },
        );
      }

      const windowAfter = await Window.findOneAndUpdate(
        {
          windowId: window.windowId,
        },
        {
          name: name,
          height: height,
        },
        { new: true },
      );
      res.status(200).send({
        result: 'success',
        window: windowAfter,
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
      const { windowId, mode } = req.body;
      const room = req.room;

      if (mode != 'manual' && mode != 'timer' && mode != 'auto') {
        return res.status(400).send({
          result: 'fail',
          message: 'mode không phải là một trong 3 TH: manual, timer, auto',
        });
      }

      client.publish(
        topic,
        JSON.stringify({
          command: 'window-change-mode',
          mode: mode.toString(),
          roomId: room.roomId,
          windownOrder:
            parseInt(windowId.slice(17, 19)) > 9
              ? parseInt(windowId.slice(-2)).toString()
              : parseInt(windowId.slice(-1)).toString(),
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
              message: `Yêu cầu window-change-mode: ${mode} đã được gửi`,
            });
          }
        },
      );

      await Window.findOneAndUpdate(
        {
          windowId: windowId,
        },
        {
          mode: mode,
        },
      );

      res.status(200).send({
        result: 'success',
        message: `window-change-mode thành công: ${mode}: ${windowId}`,
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
      const { windowId, status } = req.body;
      client.publish(
        topic,
        JSON.stringify({
          command: 'window-control-manual',
          status: status.toString(),
          windowOrder:
            parseInt(windowId.slice(17, 19)) > 9
              ? parseInt(windowId.slice(-2)).toString()
              : parseInt(windowId.slice(-1)).toString(),
          roomId:
            parseInt(windowId.slice(17, 19)) > 9
              ? windowId.slice(0, windowId.length - 2)
              : windowId.slice(0, windowId.length - 1),
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
              message: `Yêu cầu window-control-manual: ${status}: ${windowId} đã được gửi`,
            });
          }
        },
      );

      await Window.findOneAndUpdate({ windowId: windowId }, { status: status });
      res.status(200).send({
        result: 'success',
        message: `Yêu cầu điều khiển rềm cửa đã được gửi: ${status}`,
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
      const { windowId, breakpoints } = req.body;
      client.publish(
        topic,
        JSON.stringify({
          command: 'window-control-change-breakpoint',
          breakpoints: breakpoints.toString(),
          windowOrder:
            parseInt(windowId.slice(17, 19)) > 9
              ? parseInt(windowId.slice(-2)).toString()
              : parseInt(windowId.slice(-1)).toString(),
          roomId:
            parseInt(windowId.slice(17, 19)) > 9
              ? windowId.slice(0, windowId.length - 2)
              : windowId.slice(0, windowId.length - 1),
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
              message: `Yêu cầu window-control-change-breakpoint: ${breakpoints}: ${windowId} đã được gửi`,
            });
          }
        },
      );
      await Window.findOneAndUpdate({ windowId: windowId }, { breakpoints: breakpoints });
      res.status(200).send({
        result: 'success',
        message: `Thay đổi breakpoint thành công: ${breakpoints}`,
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
      const { windowId, timers } = req.body;
      client.publish(
        topic,
        JSON.stringify({
          command: 'window-control-change-timer',
          timers: timers,
          windowOrder:
            parseInt(windowId.slice(17, 19)) > 9
              ? parseInt(windowId.slice(-2))
              : parseInt(windowId.slice(-1)),
          roomId:
            parseInt(windowId.slice(17, 19)) > 9
              ? windowId.slice(0, windowId.length - 2)
              : windowId.slice(0, windowId.length - 1),
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
              message: `Yêu cầu window-control-change-timer: ${timers}: ${windowId} đã được gửi`,
            });
          }
        },
      );
      await Window.findOneAndUpdate({ windowId: windowId }, { timers: timers });
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
      const { windowId } = req.body;
      const room = req.room;

      const windowOrder =
        parseInt(windowId.slice(17, 19)) > 9
          ? parseInt(windowId.slice(-2))
          : parseInt(windowId.slice(-1));

      client.publish(
        topic,
        JSON.stringify({
          command: 'window-delete',
          windowOrder: windowOrder,
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
              message: `Yêu cầu window-delete: ${room.roomId} ${windowOrder} đã được gửi`,
            });
          }
        },
      );
      await Window.deleteOne({
        windowId: windowId,
      });
      await Room.findOneAndUpdate(
        {
          roomId: room.roomId,
        },
        {
          connectedWindow: removeExist(room.connectedWindow, windowOrder),
        },
      );
      res.status(200).send({
        result: 'success',
        message: `Xớa cửa sổ thành công: ${windowId}`,
      });
    } catch (err) {
      return res.status(500).send({
        result: 'fail',
        message: err.message,
      });
    }
  },
};

module.exports = windowController;
