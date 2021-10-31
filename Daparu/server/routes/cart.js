const express = require('express');
const router = express.Router();

const { Cart } = require('../models/Cart');
const { Product } = require('../models/Product');

// Add cart item
router.post('/add', (req, res) => {
    console.log('전달')

    const { email, productId } = req.body;

    // 카트에 넣으려는 상품이 이미 있는지 확인
    Cart.findOne({ email: email }, (err, cart) => {
        let duplicate = false;
        cart.cart.forEach(item => {
            if (item.id === productId) {
                duplicate = true;
            }
        });

        // 상품이 이미 있는 경우
        if (duplicate) {
            Cart.findOneAndUpdate(
                { email: email, "cart.id": productId },
                { $inc: { "cart.$.quantity": 1 } },
                { new: true },
                (err, cart) => {
                    if (err) return res.status(200).json({ success: false, err });
                    console.log('카트 저장 성공');
                    res.status(200).send(cart);
                }
            );
        } 
        // 상품이 없는 경우
        else {
            Cart.findOneAndUpdate(
                { email: email },
                {
                    $push: {
                        cart: {
                            id: productId,
                            quantity: 1,
                            date: Date.now(),
                        }
                    }
                },
                { new: true },
                (err, cartSchema) => {
                    if (err) return res.status(400).json({ success: false, err });
                    console.log('카트 저장 성공');
                    res.status(200).send(cart);
                }
            );
        }
    });
});

// Show cart items
router.post('/', (req, res) => {
    const email = req.body.email;

    Cart.findOne({ email: email }, async (err, cart) => {
        if (err) {
            console.log(err);
            return res.json({
                success: false,
                err,
            });
        }


        // 이 밑의 부분에서 동기화가 필요함..!
        let newCart = [];
        
        cart.cart.forEach(item => {
            Product.findOne({ _id: item.id }, (err, product) => {
                if (err) {
                    console.log(err);
                    return res.json({
                        success: false,
                        err,
                    });
                }

                newCart.push({
                    productInfo: product,
                    quantity: item.quantity,
                    date: item.date,
                });
            });
        });

        console.log(newCart);

        return res.json({
            success: true,
            cart: newCart,
        });
    });
});

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

        const cart = cart.cart;
        const newCart = cart.filter((element) => element.id !== id);

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
});

module.exports = router;