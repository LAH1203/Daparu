const express = require('express');
const router = express.Router();
const { Payment } = require('../models/Payment');
const { Product } = require('../models/Product');


router.post('/successBuy', (req, res) => {

  const payment = new Payment(req.body)

  payment.save((err) => {
    if (err) {
      console.log('상품 구매 실패')
      return res.status(400).json({ success: false, err })
    }
    return res.status(200).json({ success: true })
  })

  /*

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
*/
});

module.exports = router;