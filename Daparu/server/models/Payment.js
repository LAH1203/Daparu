const mongoose = require('mongoose');

const paymentSchema = mongoose.Schema({

  user: {
    type: String,
  },
  data:{
    type: Object,
  },
  product:{
    type: Object,
  }

}, { timestamps: true })


const Payment = mongoose.model('Payment', paymentSchema)
module.exports = { Payment }