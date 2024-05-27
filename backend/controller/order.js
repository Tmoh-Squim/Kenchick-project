const orderModel = require("../model/order");
const productModel = require("../model/chicks");
const asyncHandler = require("express-async-handler");

const createOrder = asyncHandler(async (req, res, next) => {
  try {
    const { cart, paymentInfo, user, deliveryDetails, totalPrice } = req.body;

    cart.forEach(async (product) => {
      const exists = await productModel.findById(product._id);
      exists.sold += 1;
      exists.stock -= 1;

      await exists.save();
    });

    const newOrder = {
      cart: cart,
      paymentInfo: paymentInfo,
      user: user,
      totalPrice: totalPrice,
      deliveryDetails: deliveryDetails,
    };
    await orderModel.create(newOrder);

    res.send({
      success: true,
      message: "Order placed successfully",
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
const getOrdersUser = asyncHandler(async (req, res, next) => {
  try {
    const id = req.params.id;
    const orders = await orderModel
      .find({ "user._id": id })
      .sort({ createdAt: -1 });

    res.send({
      success: true,
      orders,
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
const getOrdersAdmin = asyncHandler(async (req, res, next) => {
  try {
    const orders = await orderModel.find({}).sort({ createdAt: -1 });

    res.send({
      success: true,
      orders,
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

module.exports = { createOrder, getOrdersAdmin, getOrdersUser };
