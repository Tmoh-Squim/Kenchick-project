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
  AddDeliveryDetails,
  removeAddress,
} = require("../controller/user");
const { isAuthenticated, isAdmin } = require("../middleware/auth");

const router = express.Router();

router.post("/create-user", createUser);
router.post("/login-user", Login);
router.post("/forgot-password", ResetPassword);
router.get("/getUser", isAuthenticated, loadUser);
router.post("/verify-otp", VerifyOtp);
router.post("/reset-password", ForgotPassword);
router.post('/change-password/:id',changePassword);
router.get('/admin-users',isAuthenticated,isAdmin,getUsers);
router.post('/update-user-details/:id',isAuthenticated,updateUserDetails);
router.delete('/delete-user/:id',isAuthenticated,isAdmin,deleteUserAdmin);
router.post('/delivery-details/:id',isAuthenticated,AddDeliveryDetails);
router.post('/remove-address/:id',isAuthenticated,removeAddress)

module.exports = router;