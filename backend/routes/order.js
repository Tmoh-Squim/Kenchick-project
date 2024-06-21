const express = require("express");
const {
  createOrder,
  getOrdersAdmin,
  getOrdersUser,
  updateOrder,
} = require("../controller/order");
const { isAuthenticated, isAdmin } = require("../middleware/auth");

const router = express.Router();

router.post("/create-order",isAuthenticated, createOrder);
router.get("/admin-orders",isAuthenticated,isAdmin, getOrdersAdmin);
router.get("/user-orders/:id",isAuthenticated, getOrdersUser);
router.post("/update-order/:id",isAuthenticated,isAdmin, updateOrder);
router.post("/refund-order/:id",isAuthenticated, updateOrder);

module.exports = router;
