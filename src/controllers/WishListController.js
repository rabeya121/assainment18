const {
  wishListService,
  createWishListService,
  removeWishListService,
} = require("../service/WishListServices");

exports.wishList = async (req, res) => {
  const result = await wishListService(req);
  return res.status(200).json(result);
};
exports.createWishList = async (req, res) => {
  const result = await createWishListService(req);
  return res.status(200).json(result);
};
exports.removeWishList = async (req, res) => {
  const result = await removeWishListService(req);
  return res.status(200).json(result);
};

