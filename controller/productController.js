const productModel = require('../models/productModel.js');
const cloudinary = require('../middleware/CLoudinary.js');
const User = require('../models/userModel.js');
const sendEmail = require('../middleware/emailSender.js');

exports.createProductWithEmail = async (req, res) => {
  try {
    const { name, price, description, imageUrl } = req.body;
    const product = new productModel({ name, price, description, imageUrl });
    await product.save();
    res.status(201).json({ created: product });

    //Get all admins
    const admins = await User.find({ role: "admin" });
    const adminEmails = admins.map(a => a.email).join(", ");

    // Send email to admins
    const subject = "New Product Created";
    const message = 
    `<h3>New Product Alert</h3>
    <p>A new product has been created:</p>
    <ul>
      <li><strong>Name:</strong> ${product.name}</li>
      <li><strong>Price:</strong> $${product.price}</li>
      <li><strong>Description:</strong> ${product.description}</li>
      <li><strong>imageUrl:</strong> ${product.imageUrl}</li>
    </ul>
    `;

    await sendEmail(adminEmails, subject, message);

  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};



exports.updateProductImages = async (req, res) => {
  try {
    const productId = req.params.id;

    const product = await productModel.findById(productId);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    if (product.imageUrl) {
      const publicId = product.image.split('/').pop()(".")[0];
      await cloudinary.uploader.destroy(`products/${publicId}`);
    }

    //save new image to cloudinary
    product.imageUrl = req.file.path;

    await product.save();
    res.status(200).json({ 
      message: "Image uploaded successfully", 
      product});

  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

exports. createProduct = async (req, res) => {
  try {
    const product = await productModel.create(req.body);
    res.status(201).json({created: product})

  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
}

exports.getProducts = async (req, res) => {
try {
    const product = await productModel.findById(req.params.id);
    console.log(`${product}`)
    if (!product) {
        return res.status(400).json({ message: "Product not found" });
    }
    res.json({got: product});
} catch (error) {
    return res.status(400).json({ message: error.message });
}
};
    //create product 
    // try {
    //     const { name, description, price } = req.body;
    //     const product = new productModel({ name, description, price });
    //     await product.save();
    //     res.status(201).json(product);
    // } catch (error) {
    //     return res.status(400).json({ message: error.message });
    // }