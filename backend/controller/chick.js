const chickModel = require("../model/chicks");
const asyncHandler = require("express-async-handler");
const cloudinary = require("../utils/cloudinary");


const createChick = asyncHandler(async(req,res,next)=>{
    try {
        const {title,description,price,stock,category} = req.body;

        const file = req.file;
        const fileUrl = file.filename;

       /* const res = await cloudinary.uploader.upload(file.path,{
            folder:"chicks"
        })
        const fileUrl = res.secure_url;
        const public_id = res.public_id;
        */
       //const fileUrl = file.filename;

        const newChick = {
            title:title,
            description:description,
            price:price,
            image:fileUrl,
            stock:stock,
            category:category
            //public_id:public_id
        }
        const chick = await chickModel.create(newChick);
        res.send({
            success:true,
            message:"Product uploaded successfully",
            product:chick
        })
    } catch (error) {
        return next(res.send({message:error.message}));
    }
})

const getProducts = asyncHandler(async(req,res,next)=>{
    try {
        const products = await chickModel.find({});

        res.send({
            success:true,
            products
        })
    } catch (error) {
        return next(res.send({message:error.message}))
    }
})

const deleteChick = asyncHandler(async(req,res,next)=>{
    try {
        const id = req.params.id;
        const chick = await chickModel.findById(id);
        if(!chick){
            return res.send({
                success:false,
                message:"Product with that id not found!"
            })
        }
        await chickModel.findByIdAndDelete(id);

        res.send({
            success:true,
            message:"Product deleted successfully!"
        })
    } catch (error) {
        return next(res.send({
            success:false,
            message:error.message
        }))
    }
})

const updateProduct = asyncHandler(async(req,res,next)=>{
    try {
        const id = req.params.id;
        const {title,description,price,stock,category} = req.body;
        const product =await chickModel.findById(id);
        if(!product){
            return res.send({
                success:false,
                message:'Product not found!'
            })
        }

        product.title = title || product.title;
        product.description = description || product.description;
        product.price = price || product.price;
        product.stock = stock || product.stock;
        product.category = category || product.category;
        product.image = product.image;

        await product.save();

        res.send({
            success:true,
            message:"Product updated successfully"
        })
    } catch (error) {
        return next(res.send({
            success:false,
            message:error.message
        }))
    }
})


module.exports = {createChick,getProducts,deleteChick,updateProduct}