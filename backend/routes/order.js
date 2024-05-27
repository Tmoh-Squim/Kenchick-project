const express = require("express");
const {
  createOrder,
  getOrdersAdmin,
  getOrdersUser,
} = require("../controller/order");

const router = express.Router();

router.post("/create-order", createOrder);
router.get("/admin-orders", getOrdersAdmin);
router.get("/user-orders/:id", getOrdersUser);

module.exports = router;
