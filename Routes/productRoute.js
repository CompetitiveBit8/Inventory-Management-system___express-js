const express = require('express');
const router1 = express.Router();
const { createProduct, getProducts, updateProductImages, createProductWithEmail } = require('../controller/productController.js');
const upload = require('../middleware/CLoudinary.js')

const { protect } = require('../middleware/authMiddleware.js');
const { authorizeRoles } = require('../middleware/roleMiddleware.js');

router1.post('/createproduct', protect, createProduct);
router1.post('/getproducts', getProducts)
router1.patch('/upload/:id', upload.single('imageUrl'), updateProductImages)
router1.post('/createproductwithemail', createProductWithEmail)

module.exports = router1;   