const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
    message:{
        type:String,
    },
    answer:{
        type:String
    }
},{timestamps:true})

module.exports = new mongoose.model("chats",messageSchema);