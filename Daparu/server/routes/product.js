const express = require('express');
const router = express.Router();
const multer = require('multer');

const { Product } = require('../models/Product');
const { Review } = require('../models/Review');


// var storage = multer.diskStorage({
//   destination: function (req, file, cb) {//어디에 파일이 저장되는지
//     cb(null, 'upload/')
//   },
//   filename: function (req, file, cb) {
//     cb(null, `${Date.now()}_${file.originalname}`)//파일을 저장할 때 어떤 이름으로 저장할건지
//   }
// })

const encode = (data) => {
  let buffer = Buffer.from(data);
  let base64 = buffer.toString('base64');
  return base64;
};

const upload = multer({ storage: multer.memoryStorage() }).single('file');


router.post('/images', (req, res) => {
  //상품 이미지 저장
  upload(req, res, err => {
    if (err) {
      return req.json({ success: false, err })
    }
    return res.json({
      success: true,
      fileBuffer: res.req.file.buffer.toString('base64')
    })
  })
})


//상품 업로드
router.post('/uploads', (req, res) => {

  const product = new Product(req.body)

  product.save((err) => {
    if (err) {
      console.log('상품저장실패')
      return res.status(400).json({ success: false, err })
    }
    return res.status(200).json({ success: true })
  })

})

//상품 수정
router.post('/update', (req, res) => {

  //console.log(req.body)
  const {
    productId,
    title,
    images,
    description,
    price,
    stock,
    category,
    sellerInfo } = req.body;

  //상품 아이디와 같은 상품 찾고
  //그 정보를 다시 업데이트하기
  Product.findOneAndUpdate({ _id: productId },
    {
      $set: {
        "title": title,
        "images": images,
        "description": description,
        "price": price,
        "stock": stock,
        "category": category,
        "sellerInfo": sellerInfo
      }
    },
    { new: true },
    (err, productInfo) => {
      //console.log(productInfo)
      if (err) return res.status(400).json({ success: false, err })
      return res.status(200).json({ success: true, productInfo })
    })
})


router.post('/products', (req, res) => {
  const { searchText, category } = req.body;

  console.log(searchText, category);

  // 검색어가 있을 경우
  if (searchText) {
    if (category) {
      Product.find({ title: { $regex: searchText } })
        .find({ category: category })
        .exec((err, productInfo) => {
          if (err) {
            return res.status(400).json({ success: false, err });
          }
          else {
            return res.status(200).json({ success: true, productInfo });
          }
        });
    } else {
      Product.find({ title: { $regex: searchText } })
        .exec((err, productInfo) => {
          if (err) {
            return res.status(400).json({ success: false, err });
          }
          else {
            return res.status(200).json({ success: true, productInfo });
          }
        });
    }
  }
  // 검색어가 없을 경우
  else {
    if (category) {
      Product.find({ category: category })
        .exec((err, productInfo) => {
          if (err) {
            console.log(err);
            return res.status(400).json({ success: false, err });
          }
          else {
            return res.status(200).json({ success: true, productInfo });
          }
        });
    } else {
      Product.find()
        .exec((err, productInfo) => {
          if (err) {
            console.log(err);
            return res.status(400).json({ success: false, err });
          }
          else {
            return res.status(200).json({ success: true, productInfo });
          }
        });
    }
  }

  router.get(`/products_by_id`, (req, res) => {

    //console.log('전달 완료')
    //productId를 이용해 DB에서 같은 id를 가진 정보를 가져온다

    let type = req.query.type
    let productIds = req.query.id

    if (type === 'array') {
      let ids = req.query.id.split(',')
      productIds = ids.map(item => {
        return item
      })
    }

    Product.find({ _id: { $in: productIds } })
      .exec((err, productInfo) => {
        //console.log(productInfo)
        if (err) return res.status(400).send({ success: false, err })
        return res.status(200).send({ productInfo })
      })
  })
});

router.post('/remove', (req, res) => {
  const { id, number } = req.body;
  Product.deleteOne({ _id: id }, (err) => {
    if (err) {
      console.log(err);
      return res.status(400).json({ success: false, err });
    } else {
      Product.find({ writer: number }, (err, product) => {
        return res.status(200).json({ success: true, product: product });
      });
    }
  });
});

//리뷰 업로드
router.post('/review', (req, res) => {

  const review = new Review(req.body)

  review.save((err) => {
    if (err) {
      console.log('리뷰저장실패')
      return res.status(400).json({ success: false, err })
    }
    return res.status(200).json({ success: true })
  })

})

module.exports = router;