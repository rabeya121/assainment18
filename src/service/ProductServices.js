const BrandModel = require("../models/BrandsModel");
const CategoryModel = require("../models/CategoriesModel");
const ProductSliderModel = require("../models/ProductSliderModel");
const ProductModel = require("../models/ProuctModel");
const mongoose = require("mongoose");
const reviewModel = require("../models/ReviewModel");
const ObjectId = mongoose.Types.ObjectId;
const brandListService = async (req, res) => {
  try {
    const data = await BrandModel.find();
    return { status: "success", data };
  } catch (error) {
    return { status: "failed", messaged: error }.toString();
  }
};
const categoryListService = async (req, res) => {
  try {
    const data = await CategoryModel.find();
    return { status: "success", data };
  } catch (error) {
    return { status: "failed", messaged: error }.toString();
  }
};
const sliderListService = async (req, res) => {
  try {
    const data = await ProductSliderModel.find();
    return { status: "success", data };
  } catch (error) {
    return { status: "failed", messaged: error }.toString();
  }
};
const listByBrandService = async (req) => {
  try {
    let id = new ObjectId(req.params.BrandID);
    let MatchStage = { $match: { brandID: id } };
    const joinWithBrandStage = {
      $lookup: {
        from: "brands",
        localField: "brandID",
        foreignField: "_id",
        as: "brand",
      },
    };
    const joinWithCategoryStage = {
      $lookup: {
        from: "categories",
        localField: "categoryID",
        foreignField: "_id",
        as: "category",
      },
    };
    const UnwindBrandStage = { $unwind: "$brand" };
    const UnwindCategoryStage = { $unwind: "$category" };
    const projectionStage = {
      $project: {
        "brand._id": 0,
        "category._id": 0,
        categoryID: 0,
        brandID: 0,
        createdAt: 0,
        updatedAt: 0,
        brand: {
          createdAt: 0,
          updatedAt: 0,
        },
        category: {
          createdAt: 0,
          updatedAt: 0,
        },
      },
    };
    const data = await ProductModel.aggregate([
      MatchStage,
      joinWithBrandStage,
      UnwindBrandStage,
      joinWithCategoryStage,
      UnwindCategoryStage,
      projectionStage,
    ]);

    return { status: "success", data };
  } catch (error) {
    return { status: "failed", messaged: error }.toString();
  }
};
const listByCategoryService = async (req) => {
  try {
    let categoryId = new ObjectId(req.params.CategoryID);
    let MatchStage = { $match: { categoryID: categoryId } };
    const joinWithBrandStage = {
      $lookup: {
        from: "brands",
        localField: "brandID",
        foreignField: "_id",
        as: "brand",
      },
    };
    const joinWithCategoryStage = {
      $lookup: {
        from: "categories",
        localField: "categoryID",
        foreignField: "_id",
        as: "category",
      },
    };
    const UnwindBrandStage = { $unwind: "$brand" };
    const UnwindCategoryStage = { $unwind: "$category" };
    const projectionStage = {
      $project: {
        "brand._id": 0,
        "category._id": 0,
        categoryID: 0,
        brandID: 0,
        createdAt: 0,
        updatedAt: 0,
        brand: {
          createdAt: 0,
          updatedAt: 0,
        },
        category: {
          createdAt: 0,
          updatedAt: 0,
        },
      },
    };
    const data = await ProductModel.aggregate([
      MatchStage,
      joinWithBrandStage,
      UnwindBrandStage,
      joinWithCategoryStage,
      UnwindCategoryStage,
      projectionStage,
    ]);

    return { status: "success", data };
  } catch (error) {
    return { status: "failed", messaged: error }.toString();
  }
};
const listByRemarkService = async (req, res) => {
  try {
    let remark = req.params.Remark;
    let MatchStage = { $match: { remark: remark } };
    const joinWithBrandStage = {
      $lookup: {
        from: "brands",
        localField: "brandID",
        foreignField: "_id",
        as: "brand",
      },
    };
    const joinWithCategoryStage = {
      $lookup: {
        from: "categories",
        localField: "categoryID",
        foreignField: "_id",
        as: "category",
      },
    };
    const UnwindBrandStage = { $unwind: "$brand" };
    const UnwindCategoryStage = { $unwind: "$category" };
    const projectionStage = {
      $project: {
        "brand._id": 0,
        "category._id": 0,
        categoryID: 0,
        brandID: 0,
        createdAt: 0,
        updatedAt: 0,
        brand: {
          createdAt: 0,
          updatedAt: 0,
        },
        category: {
          createdAt: 0,
          updatedAt: 0,
        },
      },
    };
    const data = await ProductModel.aggregate([
      MatchStage,
      joinWithBrandStage,
      UnwindBrandStage,
      joinWithCategoryStage,
      UnwindCategoryStage,
      projectionStage,
    ]);
    console.log(data);
    return { status: "success", data };
  } catch (error) {
    return { status: "failed", messaged: error }.toString();
  }
};
const listBySimilarService = async (req, res) => {
  try {
    let categoryId = new ObjectId(req.params.CategoryID);
    let MatchStage = { $match: { categoryID: categoryId } };
    let limit = { $limit: 20 };
    const joinWithBrandStage = {
      $lookup: {
        from: "brands",
        localField: "brandID",
        foreignField: "_id",
        as: "brand",
      },
    };
    const joinWithCategoryStage = {
      $lookup: {
        from: "categories",
        localField: "categoryID",
        foreignField: "_id",
        as: "category",
      },
    };
    const UnwindBrandStage = { $unwind: "$brand" };
    const UnwindCategoryStage = { $unwind: "$category" };
    const projectionStage = {
      $project: {
        "brand._id": 0,
        "category._id": 0,
        categoryID: 0,
        brandID: 0,
        createdAt: 0,
        updatedAt: 0,
        brand: {
          createdAt: 0,
          updatedAt: 0,
        },
        category: {
          createdAt: 0,
          updatedAt: 0,
        },
      },
    };
    const data = await ProductModel.aggregate([
      MatchStage,
      limit,
      joinWithBrandStage,
      UnwindBrandStage,
      joinWithCategoryStage,
      UnwindCategoryStage,
      projectionStage,
    ]);

    return { status: "success", data };
  } catch (error) {
    return { status: "failed", messaged: error }.toString();
  }
};

const detailsService = async (req, res) => {
  try {
    let productId = new ObjectId(req.params.ProductID);

    let MatchStage = { $match: { _id: productId } };
    const joinWithBrandStage = {
      $lookup: {
        from: "brands",
        localField: "brandID",
        foreignField: "_id",
        as: "brand",
      },
    };
    const joinWithCategoryStage = {
      $lookup: {
        from: "categories",
        localField: "categoryID",
        foreignField: "_id",
        as: "category",
      },
    };
    const joinWithDetailsStage = {
      $lookup: {
        from: "productdetails",
        localField: "_id",
        foreignField: "productID",
        as: "details",
      },
    };
    const UnwindBrandStage = { $unwind: "$brand" };
    const UnwindCategoryStage = { $unwind: "$category" };
    const UnwindDetailsStage = { $unwind: "$details" };
    const projectionStage = {
      $project: {
        "brand._id": 0,
        "category._id": 0,
        categoryID: 0,
        brandID: 0,

        createdAt: 0,
        updatedAt: 0,
        brand: {
          createdAt: 0,
          updatedAt: 0,
        },
        category: {
          createdAt: 0,
          updatedAt: 0,
        },
        details: {
          productID: 0,
        },
      },
    };
    console.log(joinWithCategoryStage);
    const data = await ProductModel.aggregate([
      MatchStage,
      joinWithBrandStage,
      joinWithCategoryStage,
      joinWithDetailsStage,
      UnwindBrandStage,
      UnwindCategoryStage,
      UnwindDetailsStage,
      projectionStage,
    ]);
    return { status: "success", data };
  } catch (error) {
    return { status: "failed", messaged: error }.toString();
  }
};
const listByKeywordService = async (req, res) => {
  try {
    let searchRegex = { $regex: req.params.Keyword, $options: "i" };
    let searchParam = [{ title: searchRegex }, { shortDes: searchRegex }];
    let SearchStage = { $or: searchParam };
    let MatchStage = { $match: SearchStage };
    const joinWithBrandStage = {
      $lookup: {
        from: "brands",
        localField: "brandID",
        foreignField: "_id",
        as: "brand",
      },
    };
    const joinWithCategoryStage = {
      $lookup: {
        from: "categories",
        localField: "categoryID",
        foreignField: "_id",
        as: "category",
      },
    };
    const joinWithDetailsStage = {
      $lookup: {
        from: "productdetails",
        localField: "_id",
        foreignField: "productID",
        as: "details",
      },
    };
    const UnwindBrandStage = { $unwind: "$brand" };
    const UnwindCategoryStage = { $unwind: "$category" };
    const UnwindDetailsStage = { $unwind: "$details" };
    const projectionStage = {
      $project: {
        "brand._id": 0,
        "category._id": 0,
        categoryID: 0,
        brandID: 0,
        createdAt: 0,
        updatedAt: 0,
        brand: {
          createdAt: 0,
          updatedAt: 0,
        },
        category: {
          createdAt: 0,
          updatedAt: 0,
        },
      },
    };
    const data = await ProductModel.aggregate([
      MatchStage,
      joinWithBrandStage,
      joinWithCategoryStage,
      joinWithDetailsStage,
      UnwindBrandStage,
      UnwindCategoryStage,
      UnwindDetailsStage,
      projectionStage,
    ]);
    return { status: "success", data };
  } catch (error) {
    return { status: "failed", messaged: error }.toString();
  }
};
const reviewListService = async (req) => {
  try {
    const ProductID = new ObjectId(req.params.ProductID);
    const MatchStage = { $match: { productID: ProductID } };
    const JoinWithUserStage = {
      $lookup: {
        from: "users",
        localField: "userID",
        foreignField: "_id",
        as: "user",
      },
    };
    const UnwindUserState = { $unwind: "$user" };

    const data = await reviewModel.aggregate([
      MatchStage,
      JoinWithUserStage,
      UnwindUserState,
    ]);
    return { status: "success", data: data };
  } catch (error) {
    return { status: "failed", messaged: error }.toString();
  }
};
module.exports = {
  brandListService,
  categoryListService,
  sliderListService,
  listByBrandService,
  listByCategoryService,
  listBySimilarService,
  listByKeywordService,
  listByRemarkService,
  reviewListService,
  detailsService,
};
