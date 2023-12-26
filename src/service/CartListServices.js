const mongoose = require("mongoose");
const ProductModel = require("../models/ProuctModel");
const cartsModel = require("../models/CartModel");
const ObjectId = mongoose.Types.ObjectId;

const createCartListService = async (req) => {
    try {
        let user_id = req.headers.user_id;
        const reqBody = req.body;
        reqBody.userID = user_id;
        await cartsModel.create(reqBody);
        return { status: "success", message: "cart create success" };
      } catch (error) {
        console.log(error);
        return { status: "fail", message: "Something Went Wrong" };
      }
};

const removeCart = async (req) => {
  try {
    const user_id = req.headers.user_id;
    const reqBody = req.body; 
    reqBody.userID = user_id;
    await cartsModel.deleteOne(reqBody);
    return { status: "success", message: "Cart Item Deleted" };
  } catch (e) {
    return { status: "fail", message: "Something Went Wrong" };
  }
};

const cart = async (req) => {
  try {
    const user_id = new ObjectId(req.headers.user_id);

    const matchStage = { $match: { userID: user_id } };
    const JoinStageProduct = {
      $lookup: {
        from: "products",
        localField: "productID",
        foreignField: "_id",
        as: "product",
      },
    };
    const unwindProductStage = { $unwind: "$product" };

    const JoinStageBrand = {
      $lookup: {
        from: "brands",
        localField: "product.brandID",
        foreignField: "_id",
        as: "brand",
      },
    };
    const unwindBrandStage = { $unwind: "$brand" };

    const JoinStageCategory = {
      $lookup: {
        from: "categories",
        localField: "product.categoryID",
        foreignField: "_id",
        as: "category",
      },
    };
    const unwindCategoryStage = { $unwind: "$category" };
    const projectionStage = {
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

    const data = await cartsModel.aggregate([
      matchStage,
      JoinStageProduct,
      unwindProductStage,
      JoinStageBrand,
      unwindBrandStage,
      JoinStageCategory,
      unwindCategoryStage,
      projectionStage,
    ]);

    return { status: "success", data: data };
  } catch (e) {
    return { status: "fail", message: "Something Went Wrong" };
  }
};

module.exports = { createCartListService, removeCart, cart };
