const mongoose = require("mongoose");

const connectDB = async()=>{
    try {
        await mongoose.connect(process.env.MONGOURL)
        console.log(`mongodb connected successfully!`);
    } catch (error) {
       console.log('failed to connect database!') 
    }
}

module.exports = connectDB;