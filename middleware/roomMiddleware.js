const Room = require('../models/Room')
const { isObjectNull } = require('../utils/index')

// kiểm tra người dùng có sở hữu phòng này không
// sử dụng cho các API có sử dụng trường roomId
const room = async (req, res, next) => {
  try {
    const user = req.user
    const roomId = req.body.roomId

    if (roomId == '' || isObjectNull(roomId)) {
      return res.status(400).send({
        result: 'fail',
        message: 'Thiếu tham số roomId',
      })
    }

    const room = await Room.findOne({
      roomId: roomId,
    })

    if (!room) {
      return res.status(400).send({
        result: 'fail',
        message: 'roomId không tồn tại',
      })
    }
    if (room.user.toString() !== user.id) {
      return res.status(400).send({
        result: 'fail',
        message: 'Người dùng không sở hữu phòng này',
      })
    }

    req.room = room
    next()
  } catch (err) {
    res.status(500).send({
      result: 'fail',
      message: err.message,
    })
  }
}

module.exports = room
