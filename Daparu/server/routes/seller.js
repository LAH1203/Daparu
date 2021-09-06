const express = require('express');
const router = express.Router();

const { Seller } = require('../models/Seller');
const { Product } = require('../models/Product');

// Register Seller
router.post('/register', (req, res) => {
    const seller = new Seller(req.body);

    // 만약 이미 등록되어 있는 판매자일 경우 에러 표시
    Seller.findOne({ number: req.body.number }, (err, sell) => {
        if (err) {
            console.log(err);
            return res.json({
                success: false,
                msg: err
            });
        }

        if (sell) {
            return res.json({
                success: false,
                msg: '이미 존재하는 판매자입니다.'
            });
        }

        seller.save((err, doc) => {
            if (err) {
                console.log(err);
                return res.json({
                    success: false,
                    msg: err
                });
            }

            return res.status(200).json({
                success: true
            });
        });
    });

    
});

// Remove Seller
router.post('/remove', (req, res) => {
    const { email, number } = req.body;

    Seller.deleteOne({ email: email }, (err) => {
        if (err) {
            console.log(err);
            return res.json({
                success: false,
                err
            });
        }

        // 해당 판매자의 물건도 모두 삭제
        Product.deleteMany({ writer: number }, (err) => {
            if (err) {
                console.log(err);
                return res.json({
                    success: false,
                    err
                });
            }

            return res.status(200).json({
                success: true
            });
        });
    });
});

module.exports = router;