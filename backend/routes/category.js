const express = require("express");
const { createCategory, deleteCategory, updateCategory, getCategories } = require("../controller/category");
const {isAdmin,isAuthenticated} = require("../middleware/auth");
const router = express.Router();

router.post('/create-category',isAuthenticated,isAdmin,createCategory);
router.delete('/delete-category/:id',isAuthenticated,isAdmin,deleteCategory);
router.put('/update-category/:id',isAuthenticated,isAdmin,updateCategory);
router.get('/categories',getCategories);

module.exports = router