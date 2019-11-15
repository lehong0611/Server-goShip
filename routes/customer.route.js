const router = require('express').Router();
const { body } = require('express-validator');
const Customer = require('../models/Customer');
const authen = require('../middlewares/authen');

const cusController = require('../controllers/customer.controller');

//Register
router.post(
    '/register',
    [
        body('Email').isEmail().withMessage('Vui lòng nhập email hợp lệ').trim().normalizeEmail().custom(async email => {
            const isEmailExists = await Customer.countDocuments({ Email: email })
            if (isEmailExists) throw new Error('Email đã tồn tại');
        }),
        body('Password').isLength({ min: 8 }).withMessage('Mật khẩu ít nhất có 8 ký tự'),
    ],
    cusController.register);

router.post(
    '/login',
    [
        body('Email').isEmail().withMessage('Vui lòng nhập email hợp lệ').trim()
    ],
    cusController.login);

router.get('/customers', authen.isAuthorized, cusController.getAllCustomers);

router.get('/customerDetail', authen.isAuthorized, cusController.getDetailCustomer);

router.put('/updateCus/:CusId', authen.isAuthorized, cusController.updateActive);

router.put('/updateInfo', authen.isAuthorized, cusController.updateInfo);

module.exports = router;