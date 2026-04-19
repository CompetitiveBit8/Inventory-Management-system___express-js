const mongoose = require('mongoose');
const User = require('./userModel.js')


const productSchema = new mongoose.Schema({
    name: {type: String, required: true},
    price: { type: Number, required: true },
    quantity: { type: String, required: true},
    imageUrl: { type: String},
    role: {type: String}
}, {timestamps: true});

module.exports = mongoose.model('Product', productSchema);