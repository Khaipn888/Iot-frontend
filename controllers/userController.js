const User = require('../models/User');
const utils = require('../utils/index');
const jwt = require('jsonwebtoken');
const sendEmail = require('../utils/nodeMailer');
const { isError } = require('lodash');
const moment = require('moment');

const userController = {
  signUp: async (req, res) => {
    try {
      // check User exist

      let user = await User.findOne({
        email: req.body.email,
      });

      if (user) {
        return res.send({
          result: 'fail',
          message: 'Email đã được đăng ký',
        });
      }

      const hashed = await utils.sha256(req.body.password);

      var accessToken = utils.generateRandomStr(32);

      const newUser = new User({
        fullname: req.body.fullname,
        email: req.body.email,
        password: hashed,
        accessToken: accessToken,
        expirationDateToken: null,
      });

      await newUser.save();

      return res.send({
        result: 'success',
        user: newUser,
      });
    } catch (error) {
      res.status(500).send({
        result: 'fail',
        error: error.message,
      });
      console.log(error);
    }
  },

  signIn: async (req, res) => {
    try {
      let user;
      // if (req.headers.authorization) {
      //   const accessToken = req.headers.authorization.split(" ")[1];

      //   user = await User.findOne({
      //     accessToken: accessToken,
      //   });

      //   if (!user) {
      //     return res.send({
      //       result: "failed",
      //       reason: "Không đủ quyền truy cập",
      //     });
      //   }

      //   return res.send({
      //     result: "success",
      //     user: user,
      //   });
      // } else {
      // user = await User.findOne({
      //   email: req.body.email,
      // });
      // }

      user = await User.findOne({
        email: req.body.email,
      });
      if (!user) {
        return res.status(400).json({
          result: 'fail',
          reason: 'Tài khoản không tồn tại',
        });
      }

      const hashed = await utils.sha256(req.body.password);
      const validPassword = hashed === user.password;

      if (!validPassword) {
        return res.status(400).json({
          result: 'fail',
          reason: 'Sai mật khẩu',
        });
      }

      let responseUser;

      var token = await jwt.sign({ email: req.body.email }, process.env.JWT_KEY);

      var expirationDate = new Date();

      var time = expirationDate.getTime();

      var time1 = time + 24 * 3600 * 1000; // gia hạn token 1 ngày

      var setTime = expirationDate.setTime(time1);

      var expirationDateStr = moment(setTime).format('YYYY-MM-DD HH:mm:ss').toString();
      responseUser = await User.findByIdAndUpdate(
        user.id,
        {
          accessToken: token,
          expirationDateToken: expirationDateStr,
        },
        { new: true },
      );

      return res.send({
        result: 'success',
        user: responseUser,
      });
    } catch (error) {
      res.status(500).send({
        result: 'fail',
        error: isError.message,
      });
    }
  },
  signOut: async (req, res) => {
    try {
      const accessToken = req.headers.authorization.split(' ')[1];
      const user = await User.findOne({
        accessToken: accessToken,
      });
      if (!user) {
        return res.status(401).send({
          result: 'fail',
          message: 'Không đủ quyền truy cập',
        });
      }
      await user.updateOne({
        accessToken: null,
        expirationDateToken: null,
      });

      res.send({
        result: 'success',
      });
    } catch (error) {
      res.status(500).send({
        result: 'fail',
        error: error.message,
      });
    }
  },

  requestToResetPassword: async (req, res) => {
    try {
      let { email } = req.body;

      let user = await User.findOne({
        email: email,
      });

      if (!user) {
        return res.send({
          result: 'fail',
          message: 'email không hợp lệ',
        });
      }
      var random = 100000 + Math.random() * 900000;

      var plainResetPasswordToken = Math.floor(random);

      const hasedResetPasswordToken = await utils.sha256(plainResetPasswordToken.toString());

      await User.findOneAndUpdate(
        {
          email: email,
        },
        {
          password: hasedResetPasswordToken,
        },
      );

      await sendEmail(email, 'Đặt lại mật khẩu SmartHome', plainResetPasswordToken);

      res.send({
        result: 'success',
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        result: 'fail',
        error: error.message,
      });
    }
  },
  resetPassword: async (req, res) => {
    try {
      let { email, resetPasswordToken, newPassword } = req.body;

      let user = await User.findOne({
        email: email,
      });
      const hashedResetPasswordToken = utils.sha256(resetPasswordToken);

      const hashedPassword = utils.sha256(newPassword);

      if (!user) {
        return res.send({
          resutl: 'fail',
          message: 'Đổi mật khẩu không thành công, không tìm thấy',
        });
      }

      if (user.resetPasswordToken === hashedResetPasswordToken) {
        await User.findOneAndUpdate(
          {
            email: email,
          },
          {
            resetPasswordToken: null,
            password: hashedPassword,
          },
        );
        return res.send({
          result: 'success',
          message: 'Thay đổi mật khẩu thành công',
        });
      }
    } catch (error) {
      res.status(500).send({
        result: 'fail',
        error: error.message,
      });
    }
  },

  changePassword: async (req, res) => {
    try {
      const accessToken = req.headers.authorization.split(' ')[1];

      const user = await User.findOne({
        accessToken: accessToken,
      });

      const password = await utils.sha256(req.body.password);
      const newPassword = await utils.sha256(req.body.newPassword);

      if (user) {
        if (password === user.password) {
          await User.findByIdAndUpdate(user.id, {
            password: newPassword,
          });
          return res.send({
            result: 'success',
            message: 'Đổi mật khẩu thành công',
          });
        }
        return res.send({
          result: 'fail',
          message: 'Mật khẩu cũ không chính xác',
        });
      }
      return res.send({
        result: 'fail',
        message: 'Sai email',
      });
    } catch (error) {
      res.status(500).send({
        result: 'fail',
        error: error.message,
      });
    }
  },
};

module.exports = userController;
