const mongoose = require("mongoose");

const connectDB = () => {
  mongoose
    .connect(process.env.DB_URI)
    .then(() => {
      console.log("Connect to DB successfully!");
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = connectDB;
