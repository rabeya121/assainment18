const profileModel = require("../models/ProfileModel");
const userModel = require("../models/UserModel");
const { emailSend } = require("../utility/emailHelper");
const { EncodeToken } = require("../utility/tokenHelper");

const userOTPService = async (req, res) => {
  try {
    let email = req.params.email;
    let code = Math.floor(100000 + Math.random() * 900000);
    const emailText = `Your code verification code is= ${code}`;
    const emailSubject = "Email verification";
    await emailSend(email, emailText, emailSubject);
    await userModel.updateOne(
      { email: email },
      { $set: { otp: code } },
      { upsert: true }
    );
    return { status: "success", message: "6 digit OTP send" };
  } catch (error) {
    console.log(error);
  }
};
const userLoginService = async (req, res) => {
  try {
    const email = req.params.email;
    const otp = req.params.otp;
    const total = await userModel
      .find({ email: email, otp: otp })
      .count("total");
    if (total === 1) {
      const user_id = await userModel
        .find({ email: email, otp: otp })
        .select("_id");
      const token = EncodeToken(email, user_id[0]["_id"].toString());
      await userModel.updateOne(
        { email: email },
        { $set: { otp: "0" } },
        { upsert: true }
      );
      return { status: "success", message: "Valid OTP", token: token };
    } else {
      return { status: "Fail", message: "invalid OTP" };
    }
  } catch (error) {
    return { status: "Fail", message: "invalid OTP" };
  }
};
const userLogOutService = async (req, res) => {};
const saveProfileService = async (req, res) => {
  try {
    let user_id = req.headers.user_id;
    
    let reqBody = req.body;
    reqBody.userID = user_id;
    console.log(req);
    const data = await profileModel.updateOne(
      { userID: user_id },
      { $set: reqBody },
      { upsert: true }
    );
    return { status: "success", message: "Profile Save Changed", data };
  } catch (e) {
    return { status: "fail", message: "Something Went Wrong" };
  }
};
// const updateProfileService = async (req, res) => {};
const readProfileService = async (req, res) => {
  try {
    let user_id = req.headers.user_id;
    console.log(user_id);
    const data = await profileModel.find({ userID: user_id });
    return { status: "success", message: "Profile read successfully", data };
  } catch (e) {
    console.log(e);
    return { status: "fail", message: "Something Went Wrong" };
  }
};

module.exports = {
  userLogOutService,
  userLoginService,
  userOTPService,
  saveProfileService,
  readProfileService,
};
