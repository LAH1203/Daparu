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


module.exports = router;