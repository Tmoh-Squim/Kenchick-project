const mongoose = require("mongoose");


const userSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String
    },
    phone:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        default:'user'
    }
},{timestamps:true})


module.exports = new mongoose.model("users",userSchema);