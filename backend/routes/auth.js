const express = require("express");
const {
  createUser,
  Login,
  ForgotPassword,
  loadUser,
  VerifyOtp,
  ResetPassword,
  changePassword,
  getUsers,
  updateUserDetails,
  deleteUserAdmin,
} = require("../controller/user");
const { isAuthenticated } = require("../middleware/auth");

const router = express.Router();

router.post("/create-user", createUser);
router.post("/login-user", Login);
router.post("/forgot-password", ResetPassword);
router.get("/getUser", isAuthenticated, loadUser);
router.post("/verify-otp", VerifyOtp);
router.post("/reset-password", ForgotPassword);
router.post('/change-password/:id',changePassword);
router.get('/admin-users',getUsers);
router.post('/update-user-details/:id',updateUserDetails);
router.delete('/delete-user/:id',deleteUserAdmin);

module.exports = router;
