const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reviewSchema = mongoose.Schema({
  productId:{
    type: String
  },

  key: {
    type: Number,
  },

  writer: {
    type: String
  },

  title: {
    type: String,
    maxlength: 50,
  },

  review: {
    type: String,
  },

  images: {
    type: Array,
    default: []
  },

  star: {
    type: Number,
  }


});


const Review = mongoose.model('Review', reviewSchema)
module.exports = { Review }