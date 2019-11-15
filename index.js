const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const multer = require('multer');
const authen = require('./middlewares/authen');

//set Storage Engine
const storage = multer.diskStorage({
    destination: './public/uploads/',
    filename: function (req, file, cb) {
        cb(null, Date.now() + file.originalname);
    }
});

// Init upload
const upload = multer({
    storage: storage
});

require('dotenv').config();
require('./models');
const app = express();
app.use(express.static('public'));

app.use(cors());
app.options('*', cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api', require('./routes/account.route'));
app.use('/api/branch', require('./routes/branch.route'));
app.use('/api/order', require('./routes/order.route'));
app.use('/api/customer', require('./routes/customer.route'));
app.use('/api/fee', require('./routes/fee.route'));

app.post('/api/upload', upload.single('file'), (req, res, next) => {
    const file = req.file
    if (!file) {
        const error = new Error('Please choose file')
        error.httpStatusCode = 400
        return next(error);
    }

    res.send(file);
})

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running at ${PORT}`);
});