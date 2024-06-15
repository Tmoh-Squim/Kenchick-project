const mongoose = require('mongoose');

const chatbotSchema = new mongoose.Schema({
    question:{
        type:String,
        required:true
    },
    answer:{
        type:String,
        required:true
    }
})

module.exports = new mongoose.model('chatbot',chatbotSchema);