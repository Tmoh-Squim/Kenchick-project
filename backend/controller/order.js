const orderModel = require("../model/order");
const productModel = require("../model/chicks");
const asyncHandler = require("express-async-handler");
const sendMail = require("../utils/mailer");

const createOrder = asyncHandler(async (req, res, next) => {
  try {
    const { cart, paymentInfo, user, deliveryDetails, totalPrice } = req.body;

    cart.forEach(async (product) => {
      const exists = await productModel.findById(product._id);
      exists.sold += product?.qty;
      exists.stock -= product?.qty;

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

const updateOrder = asyncHandler(async(req,res,next)=>{
  try {
    const {email,status} = req.body;
    if(!email || !status){
      res.send({
        success:false,
        message:'Email and status are required'
      })
    }
    const id = req.params.id;
    const order = await orderModel.findById(id);
    if(!order){
      res.send({
        success:false,
        message:'Order not found'
      })
    }
    if(status === "Processing refund" ){
      order?.cart?.forEach(async (product) => {
        const exists = await productModel.findById(product._id);
        exists.sold -= product?.qty;
        exists.stock += product?.qty;
  
        await exists.save();
      });
    }
    order.status = status;
    await order.save();

    await sendMail({
      email:email,
      subject:'Order status',
      message:`Hello ${email} your order is in ${status} status Order ID: ${order?._id}` 
    })

    res.send({
      success:true,
      message:'Order status updated successfully'
    })

  } catch (error) {
    return next(res.send({
      success:false,
      message:error.message
    }))
  }
})

module.exports = { createOrder, getOrdersAdmin, getOrdersUser,updateOrder };
