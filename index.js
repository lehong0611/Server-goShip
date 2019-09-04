const express = require('express');
const bodyParser = require('body-parser');

require('dotenv').config();
require('./models');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/api', require('./routes/account.route'));
app.use('/api/branch', require('./routes/branch.route'));
app.use('/api/order', require('./routes/order.route'));

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running at ${PORT}`);
});