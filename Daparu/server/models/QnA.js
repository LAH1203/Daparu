const mongoose = require('mongoose');

const qnaSchema = mongoose.Schema({
    productId: {
        type: String,
    },
    email : {
        type: String,
    },
    title: {
        type: String,
    },
    content: {
        type: String,
    },
    date: {
        type: Date,
    },
    sellerAnswer: {
        type: String,
        default: '',
    },
});

const QnA = mongoose.model('QnA', qnaSchema);

module.exports = { QnA };