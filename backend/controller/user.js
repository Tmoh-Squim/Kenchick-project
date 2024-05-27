const { HashPassword, ComparePassword } = require("../helper/hashPassword");
const userModel = require("../model/user");
const asyncHandler = require("express-async-handler");
const JWT = require("jsonwebtoken");
const sendMail = require("../utils/mailer");
const sendOtp = require("../utils/otp");
const otpModel = require("../model/otp");
const user = require("../model/user");

function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000);
}

const createUser = asyncHandler(async (req, res, next) => {
  try {
    const { name, email, phone, password } = req.body;
    if (!name || !email || !phone || !password) {
      return res.send({
        message: "All fields are required!",
      });
    }
    const existUser = await userModel.findOne({ email });
    if (existUser) {
      return next(
        res.send({
          success: false,
          message: "Email already exists!",
        })
      );
    }

    const hash = await HashPassword(password);
    const newUser = {
      name: name,
      email: email,
      phone: phone,
      password: hash,
    };

    const user = await userModel.create(newUser);

    res.send({
      success: true,
      message: "Account created successfully",
      user,
    });
  } catch (error) {
    return next(res.send({ message: error.message }));
  }
});

const Login = asyncHandler(async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return next(
        res.send({
          message: "All fields are required",
        })
      );
    }
    const user = await userModel.findOne({ email });

    if (!user) {
      return next(
        res.send({
          success: false,
          message: "User doesn't exist!",
        })
      );
    }
    const match = await ComparePassword(password, user.password);
    if (!match) {
      return next(
        res.send({
          success: false,
          message: "Invalid credentials!",
        })
      );
    }

    const token = await JWT.sign({ id: user._id }, process.env.JWT_SECRET);

    res.send({
      success: true,
      message: "Logged in successfully",
      user,
      token,
    });
  } catch (error) {
    console.log(error);
    return next(res.send({ message: error.message }));
  }
});

const ResetPassword = asyncHandler(async (req, res, next) => {
  try {
    const { email } = req.body;
    const otp = generateOTP();
    const emei = email?.email;

    const user = await userModel.findOne({ email: emei });
    if (!user) {
      return res.send({
        success: false,
        message: "Email is not registered!",
      });
    }
    const newOtp = {
      email: emei,
      otp: otp,
    };
    const exists = await otpModel.findOne({ email: emei });

    if (exists) {
      await sendMail({
        email: emei,
        subject: "Password reset otp",
        message: `Hello ${emei} use the following otp to reset your password: ${otp}`,
      }).catch((error) => {
        return res.send({
          success: false,
          message: "Please check your network connection and try again later",
        });
      });

      exists.email = exists.email;
      exists.otp = otp;
      await exists.save();
      res.send({
        success: true,
        message: "Otp sent successfully! please check your email",
        newOtp,
      });
    }
    await sendMail({
      email: email,
      subject: "Password reset otp",
      message: `Hello ${email} use the following otp to reset your password: ${otp}`,
    }).catch((error) => {
      return res.send({
        success: false,
        message: "Please check your network connection and try again later",
      });
    });

    await otpModel.create(newOtp);
    res.send({
      success: true,
      message: "Otp sent successfully! please check your email",
      newOtp,
    });
  } catch (error) {
    return next(res.send({ message: error.message }));
  }
});

const VerifyOtp = asyncHandler(async (req, res, next) => {
  try {
    const { otp, email } = req.body;
    const emailCheck = email.email;
    const otpCheck = otp.otp;
    if (!otpCheck || !emailCheck) {
      return res.send({ message: "Invalid otp", success: false });
    }
    const exist = otpModel.findOne({ email: emailCheck });
    if (!exist) {
      return res.send({
        success: false,
        message: "Invalid otp",
      });
    }
    exist.verified = true;

    res.send({
      success: true,
      message: "Otp verified successfully",
    });
  } catch (error) {
    return next(res.send({ message: error.message, success: false }));
  }
});

const ForgotPassword = asyncHandler(async (req, res, next) => {
  try {
    const { email, newPassword, otp } = req.body;

    const existOtp = await otpModel.findOne({ email, otp });
    if (!existOtp) {
      return res.send({ message: "Invalid details", success: false });
    }

    if (existOtp?.verified == false) {
      return res.send({
        message: "Otp must be verified",
        success: false,
      });
    }

    const user = await userModel.findOne({ email });
    if (!user) {
      return next(
        res.send({
          success: false,
          message: "User not found!",
        })
      );
    }

    const hash = await HashPassword(newPassword);

    user.password = hash;

    await user.save();
    await otpModel.findByIdAndDelete(existOtp._id);

    res.send({
      success: true,
      message: "Password changed successfully",
    });
  } catch (error) {
    return next(res.send({ message: error.message, success: false }));
  }
});

const loadUser = asyncHandler(async (req, res, next) => {
  try {
    const user = await userModel.findById(req.user._id);
    if (!user) {
      return res.send({
        success: false,
        message: "User not found!",
      });
    }
    res.send({
      success: true,
      user,
    });
  } catch (error) {
    console.log(error);
    return next(res.send({ message: error.message, success: false }));
  }
});

const changePassword = asyncHandler(async (req, res, next) => {
  try {
    const { newPassword, password } = req.body;
    const id = req.params.id;
    const user = await userModel.findById(id);
    if (!user) {
      res.send({
        success: false,
        message: "User not found!",
      });
    }
    const match = await ComparePassword(password, user.password);
    if (!match) {
      return res.send({
        success: false,
        message: "Old password is incorrect",
      });
    }
    const hash = await HashPassword(newPassword);
    user.password = hash;
    await user.save();

    res.send({
      success: true,
      message: "Password updated successfully",
    });
  } catch (error) {
    return next(
      res.send({
        success: false,
        message: error.message,
      })
    );
  }
});
const getUsers = asyncHandler(async (req, res, next) => {
  try {
    const users = await userModel.find({});

    res.send({
      success: true,
      users,
    });
  } catch (error) {
    return next(
      res.send({
        success: false,
        message: error.message,
      })
    );
  }
});

module.exports = {
  createUser,
  Login,
  ForgotPassword,
  ResetPassword,
  loadUser,
  VerifyOtp,
  changePassword,
  getUsers,
};
