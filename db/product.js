const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  productId: { type: Number, required: true },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String, required: true },
  description: { type: String },
  category: { 
    type: String, 
    required: true, 
    enum: ['sweets', 'dry-fruits', 'biscottis', 'sweets-gifting', 'guilt-free', 'gifting'] 
  }
});

module.exports = mongoose.model('Product', productSchema);