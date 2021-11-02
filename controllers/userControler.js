const catchAsync = require("../middlewares/catchAsync");
const User = require("../models/user");
const ApiError = require("../utils/ApiError");

exports.getUser = catchAsync(async (req, res) => {
  const { email } = req.body;

  const user = await User.getUserByEmail(email);

  res.status(201).json({
    success: true,
    data: user,
  });
});
