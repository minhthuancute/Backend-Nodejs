const express = require("express");
const catchAsync = require("../middlewares/catchAsync");
const router = express.Router();

router.get(
  "/",
  catchAsync((req, res) => {})
);

module.exports = router;
