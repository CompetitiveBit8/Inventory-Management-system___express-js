const productModel = require('../models/productModel.js');

exports. createProduct = async (req, res) => {
    try {
        const { name, description, price } = req.body;
        const product = new productModel({ name, description, price });
        await product.save();
        res.status(201).json(product);
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
};
