const express = require("express");
const userController = require("../controllers/userController");
const router = express.Router();

//sign up
router.post("/api/v1/user/sign-up", userController.signUp);

//sign in
router.post("/api/v1/user/sign-in", userController.signIn);

//sign out
router.post("/api/v1/user/sign-out", userController.signOut);

//change passsword
router.put("/api/v1/user/change_password", userController.changePassword);

//request to reset password
router.post(
  "/api/v1/user/request-reset-password",
  userController.requestToResetPassword
);

//reset password
router.post("api/v1/user/reset-password", userController.resetPassword);

module.exports = router;
