const express = require('express');
const async = require('async');
const router = express.Router();
const { Payment } = require('../models/Payment');
const { Product } = require('../models/Product');
const { Cart } = require('../models/Cart');

router.post('/successBuy', (req, res) => {

  const payment = new Payment(req.body)

  let products = [];
  req.body.product.productInfo.forEach(item => {
    products.push({ id: item.id, quantity: item.quantity })
  })


  payment.save((err, doc) => {
    if (err) {
      console.log('상품 구매 실패')
      return res.status(400).json({ success: false, err })
    }

    async.eachSeries(products, (item, callback) => {

      Product.findOneAndUpdate(
        { _id: item.id },
        {
          $inc: {
            "sold": item.quantity,
            "stock": ((-1) * item.quantity)
          }

        },
        { new: false },

      )

      callback

    }, (err) => {
      if (err) return res.status(400).json({ success: false, err })
    })

  })

  const email = req.body.user
  products.forEach(item => {
    Cart.findOneAndUpdate(
      { email: email },
      {
        $pull: {
          "cart": { "id" : item.id} 
        }
      },
      (err, cart) => {
        if (err) {
          console.log(err);
          return res.json({
            success: false,
            err,
          });
        }
        console.log('상품 삭제 성공')
      })
  })

  console.log('상품 구매 성공')
  return res.status(200).json({ success: true })

});




/*
// Delete cart item
router.post('/delete', (req, res) => {
  const { id, email } = req.body;

  Cart.findOne({ email: email }, (err, cart) => {
      if (err) {
          console.log(err);
          return res.json({
              success: false,
              err,
          });
      }

      const c = cart.cart;
      const newCart = c.filter((element) => element.id !== id);

      Cart.findOneAndUpdate(
          { email: email, "cart.id": id },
          { $set: { cart: newCart } },
          (err, cart) => {
              if (err) {
                  console.log(err);
                  return res.json({
                      success: false,
                      err,
                  });
              }

              return res.json({
                  success: true,
                  cart: cart,
              });
          }
      );
  });
});*/

module.exports = router;