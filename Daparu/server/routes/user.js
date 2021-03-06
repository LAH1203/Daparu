const express = require('express');
const router = express.Router();
const { User } = require('../models/User');
const { Seller } = require('../models/Seller');
const { Product } = require('../models/Product');
const { Cart } = require('../models/Cart');
const { Payment } = require('../models/Payment');

// Sign In
router.post('/signin', (req, res) => {
    const { email, password } = req.body;

    User.findOne({ email: email }, (err, user) => {
        // 이메일이 존재하지 않는 경우
        if (!user) {
            return res.json({
                success: false,
                message: '해당 이메일의 사용자가 존재하지 않습니다.',
            });
        }

        user.comparePassword(password, (err, isMatch) => {
            // 비밀번호가 일치하지 않는 경우
            if (!isMatch) {
                return res.json({
                    success: false,
                    message: '비밀번호가 일치하지 않습니다.',
                });
            }

            // 해당 사용자가 판매자로 등록되어 있는지 확인
            Seller.findOne({ email: email }, (err, seller) => {
                // 해당 이메일의 판매자 존재유무를 알림
                if (seller) {
                    // 해당 사용자가 판매자라면 등록된 판매 상품 검색
                    Product.find({ writer: seller.number }, (err, product) => {
                        res.status(200).json({
                            success: true,
                            user: user,
                            seller: true,
                            sellerInfo: seller,
                            product: product,
                        });
                    });
                } else {
                    res.status(200).json({
                        success: true,
                        user: user,
                        seller: false,
                    });
                }
            });
        });
    });
});

// Sign Up
router.post('/signup', (req, res) => {
    const user = new User(req.body);
    const cart = new Cart({
        email: req.body.email,
        cart: []
    });

    user.save((err, doc) => {
        if (err) {
            console.log(err);
            return res.json({
                success: false,
                err
            });
        }

        // 회원가입 시 카트 스키마에도 추가
        cart.save((err, doc) => {
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

// Remove
router.post('/remove', (req, res) => {
    const { email } = req.body;

    // 탈퇴 시 해당 이메일의 회원 정보와 판매자 정보 모두 삭제해야 함
    User.deleteOne({ email: email }, (err) => {
        if (err) {
            console.log(err);
            return res.json({
                success: false,
                err
            });
        }

        Seller.deleteOne({ email: email }, (err) => {
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

// Get Purchase History
router.post('/get/purchasehistory', (req, res) => {
    const { email } = req.body;

    Payment.find({ user: email }, (err, history) => {
        if (err) {
            return res.json({ success: false, err });
        }
        return res.json({ success: true, history });
    });
});

module.exports = router;
