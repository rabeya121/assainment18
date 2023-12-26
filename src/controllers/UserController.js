const { userOTPService, userLoginService, saveProfileService, readProfileService } = require("../service/UserServices")

exports.userOTP= async(req, res)=>{
    const result = await userOTPService(req)
    return res.status(200).json(result)
}
exports.userLogin= async(req, res)=>{
    const result = await userLoginService(req)
    if(result.status === 'success'){

        // cookies option
        const cookiesOption = {expires: new Date(Date.now()+24*6060*1000), httpOnly : false}
         res.cookie('token',result.token, cookiesOption)

        return res.status(200).json(result)
    } else{

        return res.status(200).json(result)
    }
}
exports.userLogOut= async(req, res)=>{
    try {
        const cookiesOption = {expires: new Date(Date.now()-24*6060*1000), httpOnly : false}
         res.cookie('token','', cookiesOption)
        return res.status(200).json({status: 'success'})
    } catch (error) {
        
    }
}
exports.creteProfile= async(req, res)=>{
    const result = await saveProfileService(req)
    return res.status(200).json(result)
}
exports.updateProfile= async(req, res)=>{
    const result = await saveProfileService(req)
    return res.status(200).json(result)
}
exports.readProfile= async(req, res)=>{
    const result = await readProfileService(req)
    return res.status(200).json(result)
}
