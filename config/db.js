const mongoose = require("mongoose");

const connectDB = () => {
  mongoose
    .connect("mongodb://localhost:27017/tiktok")
    .then(() => {
      console.log("Connect to DB successfully!");
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = connectDB;
