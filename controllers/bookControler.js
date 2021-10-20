const catchAsync = require("../middlewares/catchAsync");
const Book = require("../models/book");
const ApiError = require("../utils/ApiError");

exports.getBooks = catchAsync(async (req, res) => {
  const books = await Book.find({})
    .populate("author-detail", "name email -_id")
    .populate("category", "name description -_id");
  res.status(200).json({
    success: true,
    data: books,
  });
});

exports.getBooksDetail = catchAsync(async (req, res) => {
  const { id } = req.params;
  const book = await Book.findById(id);
  if (!book) {
    throw new ApiError(404, "Not Found");
  }
  res.status(200).json({
    success: true,
    data: book,
  });
});

// only guest
exports.createBooks = catchAsync(async (req, res) => {
  const { title, description, price, category } = req.body;
  // const authorID = req.user.id;
  const author = req.user.email;
  const book = await Book.create({
    title,
    description,
    // author: authorID,
    author,
    price,
    category,
  });
  res.status(201).json({
    success: true,
    data: book,
  });
});

exports.updateBooks = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { title, description, price } = req.body;
  const book = await Book.findOneAndUpdate(
    { _id: id, author },
    {
      title,
      description,
      price,
    },
    { new: true }
  );

  // const book = await Book.updateMany(
  //   { id },
  //   { title, description, price },
  //   { new: true }
  // );

  // const book = await Book.findOneAndUpdate(
  //   { id },
  //   { title, description, price },
  //   { new: true }
  // );
  if (!book) {
    throw new ApiError(404, "Not found");
  }
  res.status(200).json({
    success: true,
    data: book,
  });
});
exports.deleteBooks = catchAsync(async (req, res) => {
  const { id } = req.params;
  const author = req.user.email;
  await Book.deleteOne({ _id: id, author });
  // await Book.findByIdAndDelete(id);
  res.status(200).json({
    success: true,
  });
});
