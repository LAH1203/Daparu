const express = require('express');
const router = express.Router();

const { User } = require('../models/User');

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

            res.status(200).json({
                success: true,
                user: user,
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

module.exports = router;