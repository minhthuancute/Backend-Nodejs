const multer = require("multer");
const path = require("path");
const { nanoid } = require("nanoid");
const { GridFsStorage } = require("multer-gridfs-storage");
// thư mục hiện tại của file hiện tại: __dirname

const fileFilter = (req, file, cb) => {
  const allowExtension = [".jpg", ".png", ".gif", ".jpeg"];
  const fileExtension = path.extname(file.originalname);
  const regex = new RegExp(`(${allowExtension.join("|")})$`, "i");
  if (regex.test(fileExtension)) {
    cb(null, true);
  } else {
    cb(new Error("File extension is not allow"), false);
  }
};

const storage = new GridFsStorage({
  url: process.env.MONGO_URL,
  file: (req, file) => {
    return {
      filename: `${nanoid(32)}${path.extname(file.originalname)}`,
      bucketname: process.env.BUCKET_NAME,
    };
  },
});

const uploadMongo = multer({ storage, fileFilter });

module.exports = uploadMongo;
