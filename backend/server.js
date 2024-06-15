const express = require("express");
const compression = require("compression");
const cors = require("cors");
const path = require("path")
require('dotenv').config();
const {insertChatData} = require("./controller/chatbotdata")
const connectDB = require("./config/db")

const PORT =process.env.PORT || 8080;

const app = express()
connectDB()
const authRoutes = require("./routes/auth");
const chickRoutes = require("./routes/chicks")
const orderRoutes = require("./routes/order")
const categoryRoutes = require("./routes/category")
const chatbotRoutes = require("./routes/chatbot")
//middlewares
app.use(cors({
    origin:['https://kenchick.vercel.app',
    "https://kenchick-project.vercel.app",
    "http://localhost:3000"
  ],
    credentials: true
  }));
app.use(express.json())
app.use(compression())
app.use("/",express.static(path.join(__dirname,'/uploads')))
///rest apis

app.use("/api/v1/auth",authRoutes);
app.use("/api/v1/chick",chickRoutes);
app.use("/api/v1/order",orderRoutes);
app.use("/api/v1/category",categoryRoutes);
app.use("/api/v1/chatbot",chatbotRoutes);


app.listen(PORT,async()=>{console.log(`server run nicely at port ${PORT}`);
//await insertChatData();
})