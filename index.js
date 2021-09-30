const express = require("express");
const cors = require("cors");

const { PORT } = require("./config");
const connectDB = require("./config/db");
const catchError = require("./middlewares/error");

const user = require("./routes/userRoute");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/v1/", user);

// error middleware
app.use(catchError);

connectDB();
app.listen(PORT, () => {
  console.log("server is listen on PORT: " + PORT);
});
