const { body } = require('express-validator');
const User = require('../models/User');

function validate(req, res, next) {
    body('Email').isEmail().withMessage('Vui lòng nhập email hợp lệ').trim().normalizeEmail().custom(async email => {
        const isEmailExists = await User.countDocuments({ Email: email })
        if (isEmailExists) throw new Error('Email đã tồn tại');
    }),
    body('Password').isLength({ min: 8 }).withMessage('Mật khẩu ít nhất có 8 ký tự'),
    body('PhoneNumber').trim().custom(async phone => {
        const isPhoneExists = await User.countDocuments({ PhoneNumber: phone })
        if (isPhoneExists) throw new Error('Số điện thoại đã tồn tại');
    })
    next();
  }

module.exports = {
    validate
}