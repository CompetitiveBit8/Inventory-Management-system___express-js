const express = require('express');
const router1 = express.Router();
const createProduct = require('../controller/productController.js');

const { protect } = require('../middleware/authMiddleware.js');
const { authrizeRoles } = require('../middleware/roleMiddleware.js');

router1.post('/products', protect, createProduct.createProduct);

module.exports = router1;