const Window = require('../models/Window');
const Room = require('../models/Room');

const { isObjectNull } = require('../utils/index');

// kiểm tra người dùng có sở hữu cửa sổ hay không
// dùng cho các api có sử dụng windowId

const window = async (req, res, next) => {
  try {
    const user = req.user;
    const { windowId } = req.body;

    if (windowId === '' || isObjectNull(windowId)) {
      return res.status(400).send({
        result: 'fail',
        message: 'Thiếu tham số windowId',
      });
    }

    const roomId =
      parseInt(windowId.slice(17, 19)) > 9
        ? windowId.slice(0, windowId.length - 2)
        : windowId.slice(0, windowId.length - 1);

    const window = await Window.findOne({
      windowId: windowId,
    });

    if (!window) {
      return res.status(400).send({
        result: 'fail',
        message: 'windowId không tồn tại',
      });
    }
    const room = await Room.findOne({
      roomId: roomId,
    });
    if (!room) {
      return res.status(400).send({
        result: 'fail',
        message: 'windowId không tồn tại',
      });
    }
    if (room.user.toString() !== user.id) {
      return res.status(400).send({
        result: 'fail',
        message: 'Người dùng không sở hữu cửa sổ này',
      });
    }
    req.window = window;
    req.room = room;
    next();
  } catch (err) {
    res.status(500).send({
      result: 'fail',
      message: err.message,
    });
  }
};

module.exports = window;
