const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { nanoid } = require("nanoid");

const catchAsync = require("../middlewares/catchAsync");
const User = require("../models/user");
const ApiError = require("../utils/ApiError");

const { mailer } = require("../utils/mailer");
const { PASSWORD } = require("../constants");
const Token = require("../models/Token");
const EmailService = require("../utils/EmailService");

exports.register = catchAsync(async (req, res) => {
  const { name, password, age, email } = req.body;
  const user = await User.create({
    name,
    password,
    age,
    email,
    // role,
  });

  User.findOneAndUpdate();
  res.status(200).json({
    success: true,
    data: user,
  });
});

exports.login = catchAsync(async (req, res) => {
  const { email, password } = req.body;
  const existedEmail = await User.findOne({ email });
  if (!existedEmail) {
    throw new ApiError(400, "email or password is incorrect");
  }
  const isMatch = bcrypt.compareSync(password, existedEmail.password);
  if (!isMatch) {
    throw new ApiError(400, "email or password is incorrect");
  }
  // payload: public
  const token = jwt.sign(
    {
      email: existedEmail.email,
      name: existedEmail.name,
      role: existedEmail.role,
      id: existedEmail._id,
    },
    "123456",
    {
      expiresIn: "1d",
    }
  );
  // if (existedEmail.hashNewPassword) {
  //   return res.status(200).json({
  //     success: true,
  //     token,
  //     hashNewPassword
  //   });
  // }
  // sau này decode token, để lấy email -> kiểm tra email có trong db hay kh
  res.status(200).json({
    success: true,
    token,
  });
});

exports.forgotPasswordController = catchAsync(async (req, res) => {
  const emailCurrentUser = req.user.email;
  console.log(emailCurrentUser);
  const user = await User.findOne({ email: emailCurrentUser });
  if (!user) {
    throw new ApiError(404, "user not found");
  }
  mailer(PASSWORD.SUBJECT, emailCurrentUser).catch((err) => {
    throw new ApiError(400, "send email error");
  });

  await User.findOneAndUpdate({ hasNewPassword: true });
  res.status(200).json({
    success: true,
  });
});

//
exports.forgotPasswordController = catchAsync(async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw new ApiError(404, "Not found");
  }
  const userId = user._id;
  // kiem tra collection token tokens
  const token = await Token.findOne({ userId });
  if (token) {
    return res.json({
      success: true,
      message: "Please check your email",
    });
  }
  // tao moi token
  // random token -> random secure string
  const newToken = nanoid(32);
  const salt = bcrypt.genSaltSync();
  const hashedToken = bcrypt.hashSync(newToken, salt);
  // save token
  await Token.create({ userId, token: hashedToken });
  EmailService.sendMail(
    email,
    "Forgot password",
    `${process.env.FRONT_END_URL}/forgot/?token=${newToken}&id=${userId}`
  );
  res.json({
    success: true,
    message: "Please check your email",
  });
});

exports.updatePasswordController = catchAsync(async (req, res) => {
  const { userId, token, password } = req.body;
  const userToken = await Token.findOne({ userId });
  if (!userToken) {
    throw new ApiError(400, "Invalid token");
  }

  const isMatchToken = await bcrypt.compareSync(token, userToken.token);
  if (!token || !isMatchToken) {
    throw new ApiError(400, "Invalid token");
  }

  const user = await User.findOne({ _id: userId });
  user.password = password;
  const result = await user.save();
  if (result) {
    await userToken.remove(); // remove token after update
  }

  // userToken.delete(); // delete token after update

  // const data = await Promise.all(user.save(), userToken.delete()).catch((err) =>
  //   console.log(err)
  // );

  res.json({
    success: true,
    message: "Your password updated",
  });
});

exports.resetPasswordController = catchAsync(async (req, res) => {
  const { email } = req.user;
  const { oldPassword, newPassword } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw new ApiError();
  }
  const isValidOldPassword = bcrypt.compareSync(oldPassword, user.password);
  if (!isValidOldPassword) {
    throw new ApiError(400, "Invalid password");
  }

  user.password = newPassword;
  await user.save();
  res.json({
    success: true,
    message: "Your password updated",
  });
});

exports.somethingController = catchAsync(async (req, res) => {});
