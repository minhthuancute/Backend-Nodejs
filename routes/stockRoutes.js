const express = require("express");
const catchAsync = require("../middlewares/catchAsync");
const router = express.Router();

// heroku git:remote -a thawing-inlet-61413
// heroku git:remote

router.get(
  "/",
  catchAsync((req, res) => {})
);

module.exports = router;
