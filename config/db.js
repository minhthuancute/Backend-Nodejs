const mongoose = require("mongoose");

const ATLAST_URL =
  "mongodb+srv://minhthuanadmin:iKLL0wCpSdElt3zb@minhthuan-books.bxyjd.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

const DB_URL = " mongodb://localhost:27017/minhthuan-books";
const connectDB = () => {
  mongoose
    .connect(DB_URL)
    .then(() => {
      console.log("Connect to DB successfully!");
    })
    .catch((err) => {
      console.log(err);
    });
};

class Mongo {
  gridFs = null;
  // constructor() {
  //   this.gridFs = null;
  // }

  static connect = () => {
    mongoose
      .connect(DB_URL)
      .then(() => {
        console.log("Connect to DB successfully!");
      })
      .catch((err) => {
        console.log(err);
      });
    const conn = mongoose.connection;
    conn.once("open", () => {
      // connect gridFs
      this.gridFs = new mongoose.mongo.GridFSBucket(conn.db, {
        bucketName: process.env.BUCKET_NAME,
      });
    });
  };
}

// module.exports = connectDB;
module.exports = Mongo;
