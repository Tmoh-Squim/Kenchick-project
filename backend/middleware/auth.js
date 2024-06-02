
const jwt = require("jsonwebtoken");
const userModel = require("../model/user");
const expressAsyncHandler = require("express-async-handler");

exports.isAuthenticated = expressAsyncHandler(async (req, res, next) => {
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

exports.isAdmin = expressAsyncHandler(async(req,res,next)=>{
    try {
        const user = req.user;

        if(user?.role !== 'Admin'){
            return res.send({
                success:false,
                message:'unAuthorized Access!'
            })
        }else{
            next()
        }
    } catch (error) {
        return next(res.send({
            success:false,
            message:error.message
        }))
    }
})
