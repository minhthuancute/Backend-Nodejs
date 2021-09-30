const express = require("express");
const catchAsync = require("../middlewares/catchAsync");
const route = express.Router();

const User = require("../models/user");

route.post(
  "/register",
  catchAsync(async (req, res) => {
    const { name, password, age, email, avatar } = req.body;
    const user = await User.create({
      name,
      password,
      age,
      email,
      avatar,
    });

    res.status(200).json(user);
    // res.status(200).json({ success: true, message: "Register successfully!" });
  })
);

module.exports = route;
