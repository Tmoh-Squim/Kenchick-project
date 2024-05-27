
const asyncHandler = require("express-async-handler")
const jwt = require("jsonwebtoken");
const userModel = require("../model/user");

exports.isAuthenticated = asyncHandler(async (req, res, next) => {
    try {
        const token = req.headers.authorization;

        if (!token) {
            return res.send({message:'Authorization token not provided'});
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);


        if (!decoded || !decoded.id) {
            return res.send({message:'Invalid token'});
        }

        req.user = await userModel.findById(decoded.id);
        next();
    } catch (error) {
        console.log(error)
        return next(res.send({message:'Internal server error'}));
    }
});

