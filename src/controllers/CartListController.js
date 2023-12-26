const { removeCart, createCartListService, cart } = require("../service/CartListServices")

exports.cartList=async (req,res)=>{
    let result=await cart(req)
    return res.status(200).json(result)
}

exports.createCartList=async (req,res)=>{
    let result=await createCartListService(req)
    return res.status(200).json(result)
}

exports.removeCartList=async (req,res)=>{
    let result=await removeCart(req)
    return res.status(200).json(result)
}