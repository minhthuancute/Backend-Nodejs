const catchAsync = require("../middlewares/catchAsync");
const User = require("../models/user");
const ApiError = require("../utils/ApiError");

exports.register = catchAsync(async (req, res) => {
  const { name, password, age, email } = req.body;
  const user = await User.create({
    name,
    password,
    age,
    email,
  });

  res.status(201).json({
    success: true,
    data: user,
  });
});
