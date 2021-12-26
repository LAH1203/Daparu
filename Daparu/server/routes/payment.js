const express = require('express');
const router = express.Router();
const { Payment } = require('../models/Payment');
const { Product } = require('../models/Product');


router.post('/successBuy', (req, res) => {

  let history = [];
  let transactionData = {};

  req.body.cartDetail.forEach((item) => {
    history.push({
      dateOfPurchase: Date.now(),
      name: item.title,
      id: item._id,
      price: item.price,
      quantity: item.quantity,
      paymentId: req.body.paymentData.paymentID,
      //주소 추가 해야 함.
    })
  })

  //2. Payment 모델 안에  자세한 결제 정보들 넣어주기 
  transactionData.user = {
    id: req.user._id,
    name: req.user.name,
    email: req.user.email
  }

  transactionData.data = req.body.paymentData
  transactionData.product = history


  //payment에다가  transactionData정보 저장 
  const payment = new Payment(transactionData)
  payment.save((err, doc) => {
    if (err) return res.json({ success: false, err })


    //3. Product 모델 sold와 stock 업데이트


    //상품 당 몇개의 quantity를 샀는지 

    let products = [];
    doc.product.forEach(item => {
      products.push({ id: item.id, quantity: item.quantity })
    })


    async.eachSeries(products, (item, callback) => {

      Product.update(
        { _id: item.id },
        {
          $inc: {
            "sold": item.quantity,
            "stock": Math.abs(item.quantity)
          }

        },
        { new: false },
        callback
      )
    }, (err) => {
      if (err) return res.status(400).json({ success: false, err })
      res.status(200).json({
        success: true,
        cart: user.cart,
        cartDetail: []
      })
    }
    )

  }
  )

});

module.exports = router;