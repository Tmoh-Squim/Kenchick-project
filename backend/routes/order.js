const express = require("express");
const {
  createOrder,
  getOrdersAdmin,
  getOrdersUser,
  updateOrder,
} = require("../controller/order");

const router = express.Router();

router.post("/create-order", createOrder);
router.get("/admin-orders", getOrdersAdmin);
router.get("/user-orders/:id", getOrdersUser);
router.post("/update-order/:id", updateOrder);

module.exports = router;
