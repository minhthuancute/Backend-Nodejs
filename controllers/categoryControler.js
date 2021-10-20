const catchAsync = require("../middlewares/catchAsync");
const Category = require("../models/category");

exports.getCategory = catchAsync(async (req, res) => {
  const categories = await Category.find({});

  res.status(200).json({
    success: true,
    data: categories,
  });
});

exports.createCategory = catchAsync(async (req, res) => {
  const { name, description } = req.body;

  const category = await Category.create({
    name,
    description,
  });

  res.status(200).json({
    success: true,
    data: category,
  });
});
