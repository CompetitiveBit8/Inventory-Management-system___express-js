const express = require('express');
const router1 = express.Router();
const { createProduct, getProduct, updateProductImages, createProductWithEmail } = require('../controller/productController.js');
const upload = require('../middleware/CLoudinary.js')

// // Middleware to parse JSON
// router1.use(express.json());

// // If you're sending form data (optional)
// router1.use(express.urlencoded({ extended: true }));

const { protect } = require('../middleware/authMiddleware.js');
const { authorizeRoles } = require('../middleware/roleMiddleware.js');

router1.post('/createproduct', protect, createProduct);
router1.post('/getproduct/:id', getProduct)
router1.patch('/upload/:id', upload.single('imageUrl'), updateProductImages)
router1.post('/createproductwithemail', createProductWithEmail)

module.exports = router1;   