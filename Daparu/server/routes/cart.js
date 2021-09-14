const express = require('express');
const router = express.Router();

const { User } = require('../models/User');
const { Product } = require('../models/Product');

router.post('/', (req, res) => {
    const email = req.body.email;

    User.findOne({ email: email }, (err, user) => {
        if (err) {
            console.log(err);
            return res.json({
                success: false,
                err,
            });
        }

        return res.json({
            success: true,
            cart: user.cart,
        });
    });
});

router.post('/delete', (req, res) => {
    const { id, email } = req.body;

    User.findOne({ email: email }, (err, user) => {
        if (err) {
            console.log(err);
            return res.json({
                success: false,
                err,
            });
        }

        const cart = user.cart;
        const newCart = cart.filter((element) => element.id !== id);

        User.findOneAndUpdate(
            { email: email, "cart.id": id },
            { $set: { cart: newCart } },
            (err, user) => {
                if (err) {
                    console.log(err);
                    return res.json({
                        success: false,
                        err,
                    });
                }

                return res.json({
                    success: true,
                    user: user,
                });
            }
        );
    });
});

module.exports = router;