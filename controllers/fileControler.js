const Mongo = require("../config/db");
const catchAsync = require("../middlewares/catchAsync");
const ApiError = require("../utils/ApiError");

exports.getFile = catchAsync(async (req, res) => {
  const { filename } = req.params;
  console.log(filename);
  Mongo.gridFs.find({ filename }).toArray((err, files) => {
    if (err || !files || !files.length) {
      throw new ApiError(500, "can not get file");
    }
    Mongo.gridFs.openDownloadStreamByName(filename).pipe(res);
  });
});
