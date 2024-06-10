const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    cart:{
        type:Array,
        required:true
    },
    user:{
        type:Object,
        required:true,
    },
    paymentInfo:{
        type:Object,
        required:true,
    },
    deliveryDetails:{
        type:Object,
        required:true
    },
    totalPrice:{
        type:Number,
        required:true
    },
    status:{
        type:String,
        default:'Pending'
    }
},{timestamps:true})

module.exports =new mongoose.model('orders',orderSchema);