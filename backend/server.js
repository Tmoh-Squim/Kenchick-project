const express = require("express");
const compression = require("compression");
const cors = require("cors");
require('dotenv').config();

const connectDB = require("./config/db")

const PORT =process.env.PORT || 8080;

const app = express()
connectDB()
const authRoutes = require("./routes/auth");
const { connect } = require("mongoose");
//middlewares
app.use(cors())
app.use(express.json())
app.use(compression())
//rest apis

app.use("/api/v1/auth",authRoutes);


app.listen(PORT,()=>console.log(`server run nicely at port ${PORT}`))