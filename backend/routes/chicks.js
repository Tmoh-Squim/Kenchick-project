const express = require("express");
const { createChick, getProducts, deleteChick, updateProduct } = require("../controller/chick");
const { upload } = require("../utils/multer");
const { isAuthenticated, isAdmin } = require("../middleware/auth");

const router = express.Router();

router.post("/create-chick",isAuthenticated,isAdmin, upload.single("image"), createChick);
router.get("/get-products", getProducts);
router.delete('/delete-product/:id',isAuthenticated,isAdmin,deleteChick);
router.post('/update-product/:id',isAuthenticated,isAdmin,updateProduct)

module.exports = router;
