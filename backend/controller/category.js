const categoryModel = require("../model/category");
const expressAsyncHandler = require("express-async-handler")

const createCategory = expressAsyncHandler(async(req,res,next)=>{
    try {
        const {category} = req.body;
        if(!category){
            return res.send({
                success:false,
                message:'Category name is required!'
            })
        }
        const exists = await categoryModel.findOne({name:category});
        if(exists){
            return next(res.send({
                success:false,
                message:'Category already exists!'
            }))
        }
        const newCategory = {
            name:category
        }
         await categoryModel.create(newCategory);
        res.send({
            success:true,
            message:'Category created successfully'
        })
    } catch (error) {
        return next(res.send({
            success:false,
            message:error.message
        }))
    }
})

const deleteCategory = expressAsyncHandler(async(req,res,next)=>{
    try {
        const id = req.params.id;
        const exists = await categoryModel.findById(id);
        if(!exists){
            return res.send({
                success:false,
                message:'Category with that id not found!'
            })
        }
        await categoryModel.findByIdAndDelete(id);

        res.send({
            success:true,
            message:'Category deleted successfully'
        })
    } catch (error) {
        return next(res.send({
            success:false,
            message:error.message
        }))
    }
})
const updateCategory = expressAsyncHandler(async(req,res,next)=>{
    try {
        const {name} = req.body;
        const id = req.params.id;
        const exists = await categoryModel.findById(id);
        if(!exists){
            return res.send({
                success:false,
                message:'Category with that id not found!'
            })
        }
        const category = await categoryModel.findByIdAndUpdate({name:name});

        res.send({
            success:true,
            message:'Category updated successfully',
            category
        })
    } catch (error) {
        return next(res.send({
            success:false,
            message:error.message
        }))
    }
})

const getCategories = expressAsyncHandler(async(req,res,next)=>{
    try {
        const categories = await categoryModel.find({});

        res.send({
            success:true,
            categories
        })
    } catch (error) {
        return next(res.send({
            success:false,
            message:error.message
        }))
    }
})

module.exports = {createCategory,updateCategory,deleteCategory,getCategories}