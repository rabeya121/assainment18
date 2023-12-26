const express = require('express')
const { brandList, categoryList, listByBrand, sliderList, listByCategory, listByKeyword, listByRemark, listBySimilar, productDetails,  productReviewList, reviewList } = require('../controllers/ProductController')
const { userOTP, userLogin, userLogOut, creteProfile, updateProfile, readProfile } = require('../controllers/UserController')
const AuthVerification = require('../middleware/AuthVerification')
const { createWishList, removeWishList, wishList } = require('../controllers/WishListController')
const { cartList, createCartList, removeCartList } = require('../controllers/CartListController')
const router = express.Router()



router.get('/ProductBrandList', brandList)
router.get('/ProductCategoryList', categoryList ) 
router.get('/ProductSliderList', sliderList )
router.get('/ProductListByBrand/:BrandID', listByBrand )
router.get('/ProductListByCategory/:CategoryID', listByCategory )
router.get('/ProductListBySmilier/:CategoryID', listBySimilar )
router.get('/ProductListByKeyword/:Keyword', listByKeyword )
router.get('/ProductListByRemark/:Remark', listByRemark )
router.get('/ProductDetails/:ProductID', productDetails )
router.get('/ProductReviewList/:ProductID', reviewList )


// user 
router.get('/UserOTP/:email', userOTP)
router.get('/VerifyLogin/:email/:otp', userLogin)
router.get('/UserLogout', AuthVerification, userLogOut)
router.post('/CreateProfile', AuthVerification, creteProfile)
router.put('/UpdateProfile', AuthVerification, updateProfile)
router.get('/ReadProfile', AuthVerification, readProfile)
router.post('/SaveWishList', AuthVerification, createWishList)
router.post('/RemoveWishList', AuthVerification, removeWishList)
router.get('/WishList', AuthVerification, wishList)
router.post('/SaveCartList',AuthVerification, createCartList)
router.post('/RemoveCartList',AuthVerification, removeCartList)
router.get('/CartList',AuthVerification, cartList)

module.exports = router