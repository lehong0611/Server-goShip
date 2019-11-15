const router = require('express').Router();
const { body } = require('express-validator');
const User = require('../models/User');
const authen = require('../middlewares/authen');

const accountController = require('../controllers/account.controller');

//Login
router.post(
    '/login',
    [
        body('Email').isEmail().withMessage('Vui lòng nhập email hợp lệ').trim()
    ],
    accountController.login);

// Get All Employee (admin, normal emp)
router.get('/employees', authen.isAuthorized, accountController.getAllEmp);

// Get All shipper
router.get('/allShipper', authen.isAuthorized, accountController.getAllShipper);

// Get All User
router.get('/users', authen.isAuthorized, accountController.getAllUser);

// Get All Staff
router.get('/getAllStaff', authen.isAuthorized, accountController.getAllStaff);

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
    authen.isAuthorized,
    accountController.createUser);

// update information for shipper and staff
router.put('/updateUser/:UserId', authen.isAuthorized, accountController.updateUser);

//get detail user
router.get('/detailEmployee', authen.isAuthorized, accountController.getDetailUser);

// delete staff
router.delete('/deleteEmp/:UserId', authen.isAuthorized, accountController.deleteUser);

router.post('/changePassword', authen.isAuthorized, accountController.changePassword);

// router.post('/upload', authen.isAuthorized, upload.single('file'), accountController.uploadImage);

module.exports = router;