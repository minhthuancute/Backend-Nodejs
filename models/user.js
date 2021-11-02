const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const { ROLES } = require("../constants");

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "User name is required!"],
    },
    password: {
      type: String,
      required: [true, "Password is required!"],
      minlength: [6, " Password must be have at least 6 characters."],
      maxlength: [30, "Password must be less than 30 characters."],
    },
    age: {
      type: Number,
      // required: [true, "Age is required!"],
      // min: [16, "Age must be over 16."],
    },
    email: {
      type: String,
      required: [true, "Email is required!"],
      unique: true,
    },
    role: {
      type: String,
      enum: ROLES,
      default: ROLES.GUEST,
    },
    hasNewPassword: {
      type: Boolean,
      enum: [true, false],
      default: false,
    },
    active: {
      type: Boolean,
      default: true,
    },
    countErrorLogin: {
      type: Number,
    },
  },
  {
    collection: "mt-users",
    timestamps: true,
  }
);

mongoose.set("runValidators", true);

userSchema.pre("save", function (next) {
  // If password change -> hash password
  if (this.isModified("password")) {
    // round: độ phức tạp -> time to brute force
    const salt = bcrypt.genSaltSync();
    const hashedPassword = bcrypt.hashSync(this.password, salt);
    this.password = hashedPassword;
  }

  next();
});

userSchema.statics.getUserByEmail = function (email = "") {
  return this.findOne({ email });
};

module.exports = mongoose.model("user", userSchema);
