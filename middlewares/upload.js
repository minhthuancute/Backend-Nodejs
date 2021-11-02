const multer = require("multer");
const path = require("path");
// const ApiError = require("../utils/ApiError");
// thư mục hiện tại của file hiện tại: __dirname

const fileFilter = (req, file, cb) => {
  // check extension truoc khi upload
  const allowExtension = [".jpg", ".png", ".gif", ".jpeg"];
  const fileExtension = path.extname(file.originalname);
  const regex = new RegExp(`(${allowExtension.join("|")})$`, "i");
  if (regex.test(fileExtension)) {
    cb(null, true);
  } else {
    cb(new Error("File extension is not allow"), false);
  }
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // console.log(req);
    // console.log(file);
    cb(null, path.join(__dirname, "../uploads"));
  },
  filename: (req, file, cb) => {
    // cb(null, file.originalname);
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

const upload = multer({ storage, fileFilter });

module.exports = upload;
