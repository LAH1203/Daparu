const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reviewSchema = mongoose.Schema({

  productId : {
    type: Schema.Types.ObjectId,
    ref: 'Product'
  },

  writer: {
    type: String
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
    default: 0,
  }

});


const Review = mongoose.model('Review', reviewSchema)
module.exports = { Review }