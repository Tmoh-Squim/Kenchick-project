const express = require("express");
const compression = require("compression");
const cors = require("cors");
const path = require("path")
require('dotenv').config();

const connectDB = require("./config/db")

const PORT =process.env.PORT || 8080;

const app = express()
connectDB()
const authRoutes = require("./routes/auth");
const chickRoutes = require("./routes/chicks")
const orderRoutes = require("./routes/order")
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
app.use("/api/v1/order",orderRoutes)


app.listen(PORT,()=>console.log(`server run nicely at port ${PORT}`))