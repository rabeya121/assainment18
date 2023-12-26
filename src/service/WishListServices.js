const wishModel = require("../models/WishListModel");
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;
const wishListService = async (req) => {
  try {
    let user_id = new ObjectId(req.headers.user_id);
    let matchStage = { $match: { userID: user_id } };
    let JoinStageProduct = {
      $lookup: {
        from: "products",
        localField: "productID",
        foreignField: "_id",
        as: "product",
      },
    };
    let unwindProductStage = { $unwind: "$product" };

    let JoinStageBrand = {
      $lookup: {
        from: "brands",
        localField: "product.brandID",
        foreignField: "_id",
        as: "brand",
      },
    };
    let unwindBrandStage = { $unwind: "$brand" };

    let JoinStageCategory = {
      $lookup: {
        from: "categories",
        localField: "product.categoryID",
        foreignField: "_id",
        as: "category",
      },
    };
    let unwindCategoryStage = { $unwind: "$category" };

    let projectionStage = {
      $project: {
        _id: 0,
        userID: 0,
        createdAt: 0,
        updatedAt: 0,
        "product._id": 0,
        "product.categoryID": 0,
        "product.brandID": 0,
        "brand._id": 0,
        "category._id": 0,
      },
    };
    let data = await wishModel.aggregate([
      matchStage,
      JoinStageProduct,
      unwindProductStage,
      JoinStageBrand,
      unwindBrandStage,
      JoinStageCategory,
      unwindCategoryStage,
      projectionStage,
    ]);
    console.log(matchStage);
    return { status: "success", data: data };
  } catch (error) {
    console.log(error);
    return { status: "fail", message: "Something Went Wrong" };
  }
};
const createWishListService = async (req) => {
  try {
    let user_id = req.headers.user_id;
    const reqBody = req.body;
    reqBody.userID = user_id;
    await wishModel.updateOne(reqBody, { $set: reqBody }, { upsert: true });
    return { status: "success", message: "wishlist save success" };
  } catch (error) {
    console.log(error);
    return { status: "fail", message: "Something Went Wrong" };
  }
};
const removeWishListService = async (req) => {
  try {
    const user_id = req.headers.user_id;
    const reqBody = req.body;
    reqBody.userID = user_id;
    await wishModel.deleteOne(reqBody);
    return { status: "success", message: "wishlist remove success" };
  } catch (error) {
    return { status: "fail", message: "Something Went Wrong" };
  }
};

module.exports = {
  wishListService,
  createWishListService,
  removeWishListService,
};
