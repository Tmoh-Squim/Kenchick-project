const mongoose = require("mongoose");


const userSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    phone:{
        type:Number,
        required:true,
    },
    password:{
        type:String,
        required:true
    },
    avatar:{
        type:String
    },
    idNumber:{
        type:Number,
        required:true,
    },
    deliveryDetails:[
        {
            county:{
                type:String,
            },
            subcounty:{
                type:String,
            },
            location:{
                type:String
            },
            type:{
                type:String,
                required:true
            }
        }
    ],
    role:{
        type:String,
        default:'user'
    }
},{timestamps:true})


module.exports = new mongoose.model("users",userSchema);