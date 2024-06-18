const { HashPassword, ComparePassword } = require("../helper/hashPassword");
const userModel = require("../model/user");
const JWT = require("jsonwebtoken");
const sendMail = require("../utils/mailer");
const otpModel = require("../model/otp");
const expressAsyncHandler = require("express-async-handler");

function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000);
}

const createUser = expressAsyncHandler(async (req, res, next) => {
  try {
    const { name, email, phone, password, idNumber } = req.body;
    if (!name || !email || !phone || !password || !idNumber) {
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
    const otp = generateOTP();
    const newOtp = {
      email: email,
      otp: otp,
    };
    const exists = await otpModel.findOne({ email: email });
    if (exists) {
      await sendMail({
        email: email,
        subject: "Email verification otp",
        message: `Hello ${email} use the following otp to verify your email: ${otp}`,
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

const VerifyEmail = expressAsyncHandler(async (req, res, next) => {
  try {
    const { email, otp, name, phone, password, idNumber } = req.body;
    const file = req.file;
    const exists = await otpModel.findOne({ email, otp });
    if (!exists) {
      return next(
        res.send({
          success: false,
          message: "Invalid otp or email",
        })
      );
    }
    exists.verified = true;
    await exists.save();

    Register(email, name, phone, password, otp, idNumber, file, next, res);
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
});

async function Register(
  email,
  name,
  phone,
  password,
  otp,
  idNumber,
  file,
  next,
  res
) {
  if (!name || !email || !phone || !password || !idNumber) {
    return res.send({
      message: "All fields are required!",
    });
  }
  if(file){
    const fileUrl = file.filename;
    const otpverified = await otpModel.findOne({ otp, email });
  if (otpverified.verified === false) {
    return res.send({
      success: false,
      message: "Otp not verified",
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
    idNumber: idNumber,
    password: hash,
    avatar: fileUrl,
  };

  const user = await userModel.create(newUser);
  await otpModel.findOneAndDelete({ otp, email });

  res.send({
    success: true,
    message: "Account created successfully! Continue to login",
    user,
  });
  }

  const otpverified = await otpModel.findOne({ otp, email });
  if (otpverified.verified === false) {
    return res.send({
      success: false,
      message: "Otp not verified",
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
    idNumber: idNumber,
    password: hash,
    avatar: 'https://cdn3.iconfinder.com/data/icons/vector-icons-6/96/256-1024.png',
  };

  const user = await userModel.create(newUser);
  await otpModel.findOneAndDelete({ otp, email });

  res.send({
    success: true,
    message: "Account created successfully! Continue to login",
    user,
  });
}

const Login = expressAsyncHandler(async (req, res, next) => {
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

const ResetPassword = expressAsyncHandler(async (req, res, next) => {
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
      subject: "Email verification otp",
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

const VerifyOtp = expressAsyncHandler(async (req, res, next) => {
  try {
    const { otp, email } = req.body;
    const emailCheck = email.email;
    const otpCheck = email.otp;
    if (!otpCheck || !emailCheck) {
      return res.send({ message: "Otp can't be empty", success: false });
    }
    const exist = await otpModel.findOne({ email: emailCheck, otp: otpCheck });
    if (!exist) {
      return res.send({
        success: false,
        message: "Invalid otp",
      });
    }
    exist.verified = true;
    await exist.save();

    res.send({
      success: true,
      message: "Otp verified successfully",
    });
  } catch (error) {
    return next(res.send({ message: error.message, success: false }));
  }
});

const ForgotPassword = expressAsyncHandler(async (req, res, next) => {
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

const loadUser = expressAsyncHandler(async (req, res, next) => {
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

const changePassword = expressAsyncHandler(async (req, res, next) => {
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
const getUsers = expressAsyncHandler(async (req, res, next) => {
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
const updateUserDetails = expressAsyncHandler(async (req, res, next) => {
  try {
    const { email, phone, password } = req.body;
    const id = req.params.id;

    const user = await userModel.findById(id);
    if (!user) {
      res.send({
        success: false,
        message: "User not found!",
      });
    }
    const match = await ComparePassword(password, user?.password);
    if (!match) {
      return next(
        res.send({
          success: false,
          message: "Invalid password!",
        })
      );
    }
    user.email = email || user.email;
    user.phone = phone || user.phone;
    await user.save();

    res.send({
      success: true,
      message: "Details updated successfully",
    });
  } catch (error) {
    return res.send({
      success: false,
      message: error.message,
    });
  }
});
const deleteUserAdmin = expressAsyncHandler(async (req, res, next) => {
  try {
    const id = req.params.id;
    const user = await userModel.findById(id);
    if (!user) {
      return res.send({
        success: false,
        message: "User with that id not found!",
      });
    }
    await userModel.findByIdAndDelete(id);

    res.send({
      success: true,
      message: "User deleted successfully",
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

const AddDeliveryDetails = expressAsyncHandler(async (req, res, next) => {
  try {
    const { county, subcounty, location, type } = req.body;
    const id = req.params.id;

    if (!county || !subcounty || !location || !type) {
      return res.status(400).send({
        success: false,
        message: "Incomplete delivery details",
      });
    }

    const user = await userModel.findById(id);
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User with that id not found!",
      });
    }

    const newDeliveryDetails = {
      county: county,
      subcounty: subcounty,
      location: location,
      type: type,
    };
    if (user?.deliveryDetails?.find((data) => data.type === type)) {
      return next(
        res.send({
          success: false,
          message: "Delivery details already exists",
        })
      );
    }

    user.deliveryDetails.push(newDeliveryDetails);
    await user.save();

    res.send({
      success: true,
      message: "Details added successfully",
    });
  } catch (error) {
    next(error);
  }
});

const removeAddress = expressAsyncHandler(async (req, res, next) => {
  try {
    const id = req.params.id;
    const { addressId } = req.body;
    if (!addressId) {
      return next(
        res.send({
          success: false,
          message: "address id is required!",
        })
      );
    }
    const user = await userModel.findById(id);
    if (!user) {
      return res.send({
        success: false,
        message: "User with that id not found!",
      });
    }
    user.deliveryDetails.pull({ _id: addressId });
    await user.save();
    res.send({
      success: true,
      message: "Details deleted successfully!",
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
  updateUserDetails,
  deleteUserAdmin,
  AddDeliveryDetails,
  removeAddress,
  VerifyEmail,
};
