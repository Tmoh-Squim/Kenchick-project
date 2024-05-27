const express = require("express");
const { createChick, getProducts, deleteChick, updateProduct } = require("../controller/chick");
const { upload } = require("../utils/multer");

const router = express.Router();

router.post("/create-chick", upload.single("image"), createChick);
router.get("/get-products", getProducts);
router.delete('/delete-product/:id',deleteChick);
router.post('/update-product/:id',updateProduct)

module.exports = router;
