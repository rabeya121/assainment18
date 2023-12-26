const mongoose = require("mongoose");
const dataSchema = mongoose.Schema(
  {
    categoryName: { type: String, unique: true, require: true },
    categoryImg: { type: String, required: true },
  },
  { timestamps: true, versionKey: false }
);

const CategoryModel = mongoose.model("categories", dataSchema);
module.exports = CategoryModel;
