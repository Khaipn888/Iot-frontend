const User = require('../models/User');

const auth = async (req, res, next) => {
  try {
    const accessToken = req.headers.authorization.split(' ')[1];

    const user = await User.findOne({
      accessToken: accessToken,
    });

    if (!user) {
      return res.status(401).send({
        result: 'fail',
        message: 'Auth Middleware: token không hợp lệ',
      });
    } else {
      req.user = user;
      next();
    }
  } catch (err) {
    res.status(500).send({
      result: 'fail',
      error: err.message,
    });
  }
};
module.exports = auth;
