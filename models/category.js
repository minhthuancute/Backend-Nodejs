const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const CategorySchema = new Schema(
  {
    name: {
      type: String,
      unique: true,
    },
    description: String,
  },
  {
    collection: "mt-category",
    timestamps: true,
  }
);

module.exports = mongoose.model("Category", CategorySchema);
