const express = require('express');
const router = express.Router();
const { QnA } = require('../models/QnA');

// QnA 가져오기
router.post('/', (req, res) => {
    const productId = req.body.productId;

    QnA.find({ productId: productId }, (err, qnas) => {
        if (err) {
            console.log(err);
            return res.json({
                success: false,
                err,
            });
        }

        console.log(qnas);

        return res.json({
            success: true,
            qnas: qnas,
        });
    });
});

// QnA 작성
router.post('/writing', (req, res) => {
    const qna = new QnA(req.body);

    qna.save((err, doc) => {
        if (err) {
            console.log(err);
            return res.json({
                success: false,
                err,
            });
        }

        return res.json({
            success: true,
        });
    });
});


module.exports = router;