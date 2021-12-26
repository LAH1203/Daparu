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
            Product.findOne({ _id: productId }, (err, prod) => {
                Cart.findOneAndUpdate(
                    { email: email },
                    {
                        $push: {
                            cart: {
                                id: productId,
                                productInfo: prod,
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
            });
        }
    });
});

// Show cart items
router.post('/', async (req, res) => {
    const { email } = req.body;

    Cart.findOne({ email: email }, (err, cart) => {
        if (err) {
            console.log(err);
            return res.json({ success: false, err });
        }

        return res.json({ success: true, cart: cart.cart });
    });
});

// router.post('/', async (req, res) => {
//     const email = req.body.email;

//     await Cart.findOne({ email: email }, async (err, cart) => {
//         if (err) {
//             console.log(err);
//             return res.json({
//                 success: false,
//                 err,
//             });
//         }

//         const promise = new Promise((resolve, reject) => {
//             const newCart = searchProductInfo(cart);
//             setTimeout(() => resolve(newCart), 1000);
//         })
//             .then(value => {
//                 return res.json({
//                     success: true,
//                     cart: value,
//                 });
//             });
//     });
// });

const searchProductInfo = async (cart) => {
    const newCart = [];

    await cart.cart.forEach(async item => {
        await Product.findOne({ _id: item.id }, async (err, product) => {
            if (err) {
                console.log(err);
                return res.json({
                    success: false,
                    err,
                });
            }

            await newCart.push({
                productInfo: product,
                quantity: item.quantity,
                date: item.date,
            });
        });
    });

    return newCart;
}

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
});

module.exports = router;