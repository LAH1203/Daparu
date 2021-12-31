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

  //상품 재고 확인 후 모자란 재고가 있으면 결제하지 않고 경고 메세지 출력
  // 모자란 재고가 없으면 결제 성공

  let stockless = []; //부족한 상품을 저장할 배열
  //상품 재고 확인
  new Promise((resolve, reject) => {
    console.log(products)
    products.forEach(item => {
      Product.findOne(
        { _id: item.id, "stock": { "$lt": item.quantity } }
        , (err, stock) => {
          if (err) console.log(err)
          
          if (stock) {
            console.log('상품 재고 부족')
            stockless.push(item.id)
            //console.log(stockless)
          }

          resolve(stockless)//부족한 재고 아이디를 담은 배열 전달
        })
    })
  })

    .then(() => {
      if (stockless.length > 0) { //상품 재고가 모자랄 때
        console.log(stockless)
        return res.status(200).json({ success: false })//구매 실패
      }
      else {
        //구매내역 추가
        payment.save((err, doc) => {
          if (err) {
            console.log('상품 구매 실패')
            return res.status(400).json({ success: false, err })
          }


          async.eachSeries(products, (item, callback) => {

            //상품 재고 업데이트
            Product.findOneAndUpdate(
              { _id: item.id },
              {
                $inc: {
                  "sold": item.quantity,
                  "stock": ((-1) * item.quantity)
                }

              },
              { new: false },

              callback)

          }, (err) => {
            if (err) console.log(err)
            console.log('상품 재고 업데이트 성공')
          })



          //카트 비우기
          const email = req.body.user
          products.forEach(item => {
            Cart.findOneAndUpdate(
              { email: email },
              {
                $pull: {
                  "cart": { "id": item.id }
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
      }
    })
})

module.exports = router;