const Lamp = require('../models/Lamp');
const Room = require('../models/Room');

const { isObjectNull } = require('../utils/index');

// kiểm tra người dùng có sử hữu đèn hay không?
// dùng cho các API có sử dụng lampId
const lamp = async (req, res, next) => {
  try {
    const user = req.user;

    const { lampId } = req.body;

    if (lampId === '' || isObjectNull(lampId)) {
      return res.status(400).send({
        result: 'fail',
        message: 'Thiếu tham số lampId',
      });
    }

    const roomId =
      parseInt(lampId.slice(17, 19)) > 9
        ? lampId.slice(0, lampId.length - 2)
        : lampId.slice(0, lampId.length - 1);

    const lamp = await Lamp.findOne({
      lampId: lampId,
    });

    if (!lamp) {
      return res.status(400).send({
        result: 'fail',
        message: 'lampId không tồn tại',
      });
    }

    const room = await Room.findOne({
      roomId: roomId,
    });
    if (!room) {
      return res.status(400).send({
        result: 'fail',
        message: 'lampId không tồn tại',
      });
    }

    if (room.user.toString() !== user.id) {
      return res.status(400).send({
        result: 'fail',
        message: 'Người dùng không sở hữu đèn này',
      });
    }

    req.lamp = lamp;
    req.room = room;
    next();
  } catch (err) {
    res.status(500).send({
      result: 'fail',
      message: err.message,
    });
  }
};

module.exports = lamp;
