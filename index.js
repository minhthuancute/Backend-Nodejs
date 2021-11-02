require("dotenv").config();
const express = require("express");
const cors = require("cors");

// const connectDB = require("./config/db");
const catchError = require("./middlewares/error");
const bookRoutes = require("./routes/bookRoutes");
const authRoutes = require("./routes/authRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const userRoutes = require("./routes/userRoutes");
const stockRoutes = require("./routes/stockRoutes");
const fileRoutes = require("./routes/fileRoutes");
const EmailService = require("./utils/EmailService");
// const upload = require("./middlewares/upload");

const upload = require("./middlewares/uploadMongo");

const Mongo = require("./config/db");
const uploadMongo = require("./middlewares/uploadMongo");
const app = express();

app.use(cors());
app.use(express.json());

EmailService.init();

app.get("/", (req, res) => {
  res.send("Hello");
});

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/book", bookRoutes);
app.use("/api/v1/category", categoryRoutes);
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/file", fileRoutes);

app.use("/api/v1/stock", stockRoutes);

app.use("/test", upload.single("image"), (req, res) => {
  console.log("123");
  // req.file: single
  // req.files: array
  if (req.file) {
    // res.json({
    //   success: true,
    //   message: `Ban vua upload file ${req.file.filename} thanh cong`,
    // }),
    res.json({
      success: true,
      message: `Upload avatar successfully`,
    });
  }
});

// app.use("/test", upload.array("image", 2), (req, res) => {
// console.log("123");
// // req.file: single
// // req.files: array
// if (req.file) {
//   // res.json({
//   //   success: true,
//   //   message: `Ban vua upload file ${req.file.filename} thanh cong`,
//   // }),
//   const len = req.files.length;
//   res.json({
//     success: true,
//     message: `Da upload thanh cong ${len} ${len > 1 ? "files" : "file"}`,
//   });
// }
// });

// app.post(
//   "/uploadfields",
//   upload.fields([
//     { name: "avatar", maxCount: 2 },
//     { name: "image", maxCount: 2 },
//   ]),
//   async (req, res) => {
//     let len;
//     if (req.files.length) {
//       len = req.files.length;
//     } else {
//       len = Object.keys(req.files).reduce(
//         (acc, val) => acc + req.files[val].length,
//         0
//       );
//     }

//     res.json({
//       success: true,
//       message: `da upload thanh cong ${len} ${len > 1 ? "files" : "file"}`,
//     });
//   }
// );

app.post("/uploadmongo", uploadMongo.single("avatar"), async (req, res) => {
  if (req.file) {
    return res.json({
      success: true,
      message: "da upload thanh cong 1 file",
    });
  }
  let len;

  if (req.files.length) {
    len = req.files.length;
  } else {
    len = Object.keys(req.files).reduce(
      (acc, val) => acc + req.files[val].length,
      0
    );
  }

  res.json({
    success: true,
    message: `da upload thanh cong ${len} ${len > 1 ? "files" : "file"}`,
  });
});

app.use(catchError);

app.post("/random", (req, res) => {
  const { text } = req.body;
  console.log(text);
  const textToArray = text.replace(/\s+/g).split("");
});

Mongo.connect();

app.listen(process.env.PORT || 3000, () => {
  console.log("server is listen on PORT: " + process.env.PORT);
});
