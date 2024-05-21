const { HashPassword, ComparePassword } = require("../helper/hashPassword");
const userModel = require("../model/user");
const asyncHandler = require("express-async-handler")
const JWT = require("jsonwebtoken");
const sendMail = require("../utils/mailer");
const sendOtp = require("../utils/otp");
const otpModel = require("../model/otp")


function generateOTP() {
    return Math.floor(100000 + Math.random() * 900000);
}

const createUser = asyncHandler(async(req,res,next)=>{
    try {
        const {name,email,phone,password} = req.body;
        const existUser = await userModel.findOne({email});
        if(existUser){
            return next(res.send({
                success:false,
                message:"Email already exists!"
            }))
        }

        const hash = await HashPassword(password);
        const newUser = {
            name:name,
            email:email,
            phone:phone,
            password:hash
        }

        const user = await userModel.create(newUser)

        res.send({
            success:true,
            message:"Account created successfully",
            user
        })
    } catch (error) {
        return next(res.send({message:error.message}))
    }
})

const Login = asyncHandler(async(req,res,next)=>{
    try {
        const {email,password} = req.body;
        const user = await userModel.findOne({email})

        if(!user){
            return next(res.send({
                success:false,
                message:"User doesn't exist!"
            }))
        }
        const match = await ComparePassword(password,user.password);
        if(!match){
            return next(res.send({
                success:false,
                message:"Invalid credentials!"
            }))
        }

        const token = await JWT.sign({id:user._id},process.env.JWT_SECRET,{
            expiresIn:'7d'
        });
        
        res.send({
            success:true,
            message:"Logged in successfully",
            user,
            token
        });
    } catch (error) {
        console.log(error)
        return next(res.send({message:error.message}))
    }
})

const ResetPassword = asyncHandler(async(req,res,next)=>{
    try {
        const {email} = req.body;
        const otp = generateOTP();
        const exists = otpModel.findOne({email})
        if(exists){
            await otpModel.findOneByIdAndUpdate(exists._id,{otp:otp,email:email});
        }
        const newOtp = {
            email:email,
            otp:otp
        }
        await sendMail({
            email:email,
            subject:"Password reset otp",
            message: `Hello ${email} use the following otp to reset your password: ${otp}`
        })
        await otpModel.create(newOtp)
        res.send({
            success:true,
            message:"Otp sent successfully! please check your email",
            newOtp
        })
    } catch (error) {
        return next(res.send({message:error.message}))
    }
})

const ForgotPassword = asyncHandler(async(req,res,next)=>{
    try {
        const {email,newPassword} = req.body;

        const user = await userModel.findOne({email});
        if(!user){
            return next(res.send({
                success:false,
                message:"User not found!"
            }))
        }

        const hash = await HashPassword(newPassword);

        user.password = hash;

        await user.save();

        res.send({
            success:true,
            message:"Password changed successfully"
        })
        
    } catch (error) {
        return next(res.send({message:error.message}))
    }
})

module.exports = {createUser,Login,ForgotPassword,ResetPassword}