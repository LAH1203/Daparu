const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const key = require('./key/key');

// 몽고 디비 연결 코드 추가
mongoose.connect(key.mongoURI,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
})
.then(()=> console.log('MongoDB is connected...'))
.catch(err => console.log(err));

app.use(cors());
app.use(bodyParser.urlencoded({ 
    limit : "50mb",
    extended: true }));
app.use(bodyParser.json({
    limit : "50mb"
}));
app.use(cookieParser());

// Connect Routes
app.use('/api/user', require('./routes/user'));
app.use('/api/seller', require('./routes/seller'));
app.use('/api/product', require('./routes/product'));
app.use('/api/cart', require('./routes/cart'));
app.use('/api/qna', require('./routes/qna'));
app.use('/api/payment', require('./routes/payment'));
app.use('/api/review', require('./routes/review'));

app.use('/upload', express.static('upload'));

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Server on ${port}!`);
});