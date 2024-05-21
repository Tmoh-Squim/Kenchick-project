const otpModel = require("../model/otp");

function generateOTP() {
    return Math.floor(100000 + Math.random() * 900000);
}

const sendOtp = async(options,req,res,next)=>{
    try {
        const {email} = options.email;
        const otp = generateOTP();
        const exists = otpModel.findOne({email})
        if(exists){
            await otpModel.findOneByIdAndUpdate(exists._id,{otp:otp,email:email});
        }
        const newOtp = {
            email:email,
            otp:otp
        }
        await otpModel.create(newOtp)
        res.send({
            success:true,
            message:"Otp sent successfully",
            newOtp
        })
    } catch (error) {
        return next(res.send({message:error.message}))
    }
}

module.exports = sendOtp