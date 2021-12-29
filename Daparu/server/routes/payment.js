const express = require('express');
const async = require('async');
const router = express.Router();
const { Payment } = require('../models/Payment');
const { Product } = require('../models/Product');


router.post('/successBuy', (req, res) => {

  const payment = new Payment(req.body)

  payment.save((err, doc) => {
    if (err) {
      console.log('상품 구매 실패')
      return res.status(400).json({ success: false, err })
    }

    let products = [];
    req.body.product.productInfo.forEach(item => {
      products.push({ id: item.id, quantity: item.quantity })
    })

    async.eachSeries(products, (item, callback) => {

      Product.findOneAndUpdate(
        { _id: item.id },
        {
          $inc: {
            "sold": item.quantity,
            "stock": ((-1)*item.quantity)
          }

        },
        { new: false },
        callback
      )
    }, (err) => {
      if (err) return res.status(400).json({ success: false, err })
      res.status(200).json({ success: true })
    })


    console.log('상품 구매 성공')
    return res.status(200).json({ success: true })

  })
    
});

module.exports = router;