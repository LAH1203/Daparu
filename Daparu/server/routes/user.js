const express = require('express');
const router = express.Router();
const { User } = require('../models/User');
const { Seller } = require('../models/Seller');

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
                    res.status(200).json({
                        success: true,
                        user: user,
                        seller: true,
                        sellerInfo: seller,
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

    user.save((err, doc) => {
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

// Add to Cart
router.post('/addToCart', (req, res) => {
    console.log('전달')

    const { email, productId } = req.body;

    //유저 정보를 가져오고
    User.findOne({ email: email }, (err, user) => {

        //카트에 넣으려는 상품이 이미 있는지 확인
        let duplicate = false;
        user.cart.forEach((item) => {
            if (item.id === productId) {
                duplicate = true;
            }
        })

        if (duplicate) {
            User.findOneAndUpdate(    //이미 있으면 
                { email: email, "cart.id": productId },
                { $inc: { "cart.$.quantity": 1 } },
                { new: true },
                (err, user) => {
                    if (err) return res.status(200).json({ success: false, err })
                    res.status(200).send(user.cart)
                    console.log('카트 저장 성공')
                }
            )
        } else {  //상품이 없으면
            User.findOneAndUpdate(
                { email: email },
                {
                    $push: {
                        cart: {
                            id: productId,
                            quantity: 1,
                            date: Date.now()
                        }
                    }
                },
                { new: true },
                (err, user) => {
                    if (err) return res.status(400).json({ success: false, err })
                    res.status(200).send(user.cart)
                    console.log('카트 저장 성공')
                }
            )
        }



    })



});

module.exports = router;