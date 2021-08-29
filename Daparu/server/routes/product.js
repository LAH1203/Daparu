const express = require('express');
const router = express.Router();
const multer = require('multer');

const { Product } = require('../models/Product');

//업로드 파일에 안 올리고 바로 파일을 저장할 수는 없을까
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'upload/')//파일 저장 위치
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}_${file.originalname}`)//파일명
  }
})

var upload = multer({ storage: storage }).single("file");

router.post('/image', (req, res) => {
  //상품 이미지 저장
  upload(req, res, err => {
    if (err) {
      return req.json({ success: false, err })
    }
    return res.json({
      success: true,
      filePath: res.req.file.path,
      filename: res.req.file.filename
    })
  })
})


router.post('/uploads', (req, res) => {

  //상품 업로드 정보 저장
  const product = new Product(req.body)

  product.save((err) => {
    if (err) {
      //console.log('상품저장실패')
      return res.status(400).json({ success: false, err })
    }
    return res.status(200).json({ success: true })
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
});

module.exports = router;