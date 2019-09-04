const router = require('express').Router();
const { body, query } = require('express-validator');
const User = require('../models/User');

const accountController = require('../controllers/account.controller');

//Register
router.post(
    '/register',
    [
        body('Email').isEmail().withMessage('Vui lòng nhập email hợp lệ').trim().normalizeEmail().custom(async email => {
            const isEmailExists = await User.countDocuments({ Email: email })
            if (isEmailExists) throw new Error('Email đã tồn tại');
        }),
        body('Password').isLength({ min: 8 }).withMessage('Mật khẩu ít nhất có 8 ký tự'),
    ],
    accountController.register);

//Login
router.get(
    '/login',
    [
        body('Email').isEmail().withMessage('Vui lòng nhập email hợp lệ').trim().normalizeEmail()
    ], 
    accountController.login);

// Get All Staff 
router.get('/usersByRole', accountController.getAllUserByRole);

// Get All customer 
router.get('/customers', accountController.getAllCustomer);

//create Shipper And Staff
router.post(
    '/createEmployee',
    [
        body('Email').isEmail().withMessage('Vui lòng nhập email hợp lệ').trim().normalizeEmail().custom(async email => {
            const isEmailExists = await User.countDocuments({ Email: email })
            if (isEmailExists) throw new Error('Email đã tồn tại');
        }),
        body('Password').isLength({ min: 8 }).withMessage('Mật khẩu ít nhất có 8 ký tự'),
    ],
    accountController.createUser);

// update information for customer
router.put('/updateCustomer', accountController.updateCustomer);

// update information for shipper and staff
router.put('/updateUser', accountController.updateUser);

//get detail user
router.get('/detailEmployee', accountController.getDetailUser);

//get detail Customer
router.get('/detailcustomer', accountController.getDetailCustomer);

module.exports = router;