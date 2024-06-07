const mongoose = require("mongoose")


const chickSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    stock:{
        type:Number,
        required:true,
    },
    description:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    sold:{
        type:Number,
        default:0
    },
    public_id:{
        type:String,
    }
},{timestamps:true})


module.exports = new  mongoose.model("chicks",chickSchema);