const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const BookSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "title is required"],
      minlength: [3, "Must be at least 3 characters"],
    },
    description: {
      type: String,
    },
    author: {
      type: String,
      // required: [true, "Author is required"],
      // type: mongoose.Types.ObjectId,
      // ref: "user",
    },
    price: {
      type: Number,
      required: [true, "price is required"],
    },
    category: {
      type: mongoose.Types.ObjectId,
      ref: "Category",
    },
  },
  {
    collection: "mt-books",
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

BookSchema.virtual("author-detail", {
  ref: "user",
  localField: "author",
  foreignField: "email",
  justOne: true,
});

mongoose.set("runValidators", true); // run validation when update
module.exports = mongoose.model("Book", BookSchema);
