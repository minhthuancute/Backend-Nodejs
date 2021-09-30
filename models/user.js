const mongoose = require("mongoose");

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
      required: [true, "Age is required!"],
      min: [16, "Age must be over 16."],
    },
    email: {
      type: String,
      required: [true, "Email is required!"],
      unique: [true, "Email is already existed."],
    },
    avatar: {
      type: String,
      required: [true, "Avatar is required!"],
    },
  },
  {
    collection: "social-users",
    timestamps: true,
  }
);

mongoose.set("runValidators", true);
// const UserSchema = mongoose.model("user", userSchema);
// module.exports = UserSchema;

module.exports = mongoose.model("user", userSchema);
