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

CategorySchema.statics.findCategoryByName = function (name) {
  // return "hello" + name;
  return this.find({ name });
};

module.exports = mongoose.model("Category", CategorySchema);
