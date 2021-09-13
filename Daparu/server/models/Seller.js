const mongoose = require('mongoose');

const sellerSchema = mongoose.Schema({
    email: {
        type: String
    },
    number: {
        type: String
    },
    name: {
        type: String
    },
    product: {
        type: Array,
        default: []
    },
});

const Seller = mongoose.model('Seller', sellerSchema);

module.exports = { Seller };