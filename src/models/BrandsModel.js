const mongoose = require("mongoose");
const dataSchema = mongoose.Schema(
  {
    brandName: { type: String, unique: true, required: true },
    brandImg: { type: String, unique: true, required: true },
  },
  { timestamps: true, versionKey: false }
);

const BrandModel = mongoose.model("Brands", dataSchema);
module.exports = BrandModel;
