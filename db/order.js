const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
    userId: String,
    customer: {
        name: String,
        address: String,
        phone: String
    },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Order', OrderSchema);