const mongoose = require('mongoose');

const cartSchema = mongoose.Schema({
    email: {
        type: String
    },
    cart: {
        type: Array,
        default: []
    },
});

const Cart = mongoose.model('Cart', cartSchema);

module.exports = { Cart };