require("dotenv").config();
const express = require("express");
const cors = require("cors");

const connectDB = require("./config/db");
const catchError = require("./middlewares/error");
const bookRoutes = require("./routes/bookRoutes");
const authRoutes = require("./routes/authRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const stockRoutes = require("./routes/stockRoutes");
const EmailService = require("./utils/EmailService");

const app = express();

app.use(cors());
app.use(express.json());

// const mailer = new EmailService();
EmailService.init();

app.get("/", (req, res) => {
  res.send("Hello");
});

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/book", bookRoutes);
app.use("/api/v1/category", categoryRoutes);

app.use("/api/v1/stock", stockRoutes);

// app.use("/api/v1/category", categoryRoutes);

// error middleware
app.use(catchError);

connectDB();
app.listen(process.env.PORT || 3000, () => {
  console.log("server is listen on PORT: " + process.env.PORT);
});
