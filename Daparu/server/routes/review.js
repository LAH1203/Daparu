const express = require('express');
const router = express.Router();

const { Review } = require('../models/Review');

// 리뷰 업로드
router.post('/upload', (req, res) => {
  const review = new Review(req.body);

  review.save(err => {
    if (err) {
      return res.status(400).json({ success: false, err });
    }
    return res.status(200).json({ success: true });
  });
});

// 리뷰 보기
router.post('/show', (req, res) => {
  const { productId } = req.body;

  Review.find({ productId: productId }, (err, reviews) => {
    if (err) {
      return res.status(400).json({ success: false, err });
    }
    return res.status(200).json({ success: true, reviews });
  });
});

module.exports = router;
