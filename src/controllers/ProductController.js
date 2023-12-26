const {
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
} = require("../service/ProductServices");

exports.brandList = async (req, res) => {
  const result = await brandListService();
  return res.status(200).json(result);
};
exports.categoryList = async (req, res) => {
  const result = await categoryListService();
  return res.status(200).json(result);
};
exports.sliderList = async (req, res) => {
  const result = await sliderListService();
  return res.status(200).json(result);
};
exports.listByBrand = async (req, res) => {
  const result = await listByBrandService(req);
  return res.status(200).json(result);
};
exports.listByCategory = async (req, res) => {
  const result = await listByCategoryService(req);
  return res.status(200).json(result);
};
exports.listBySimilar = async (req, res) => {
  const result = await listBySimilarService(req);
  return res.status(200).json(result);
};
exports.listByKeyword = async (req, res) => {
  const result = await listByKeywordService(req);
 
  return res.status(200).json(result);
};
exports.listByRemark = async (req, res) => {
  const result = await listByRemarkService(req);
  return res.status(200).json(result);
};
exports.productDetails = async (req, res) => {
  
  const result = await detailsService(req);
  return res.status(200).json(result);
};
exports.reviewList = async (req, res) => {
  const result = await reviewListService(req);
  res.status(200).json(result);
}
