const express = require("express");
const {
  register,
  login,
  forgotPasswordController,
  updatePasswordController,
  resetPasswordController,
} = require("../controllers/authControler");
const { jwtAuth } = require("../middlewares/jwtAuth");
const route = express.Router();

route.post("/register", register);
route.post("/login", login);
route.post("/updatepassword", jwtAuth, updatePasswordController);
route.get("/forgotpassword", forgotPasswordController);
route.get("/resetpassword", jwtAuth, resetPasswordController);

module.exports = route;
