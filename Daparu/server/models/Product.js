const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = mongoose.Schema({
  writer: {
    type: String
  },

  title: {
    type: String,
    maxlength: 50,
  },

  description: {
    type: String,
  },

  images: {
    type: Array,
    default: []
  },

  price: {
    type: Number,
    default: 0
  },

  sold: {
    type: Number,
    maxlength: 100,
    default: 0
  },

  stock: {
    type: Number,
    default: 0
  },

  sellerInfo: {
    type: String,
  },


}, { timestamps: true })


const Product = mongoose.model('Product', productSchema)
module.exports = { Product }