const Customer = require('../models/Customer');
const { validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');

// Register of customer
module.exports.register = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.send({ status: 0, message: errors.array() });
        }

        const { Email, Password, UserName, Phone, FullName, Address, Lat, Lng, Active } = req.body;

        const hassPass = await bcrypt.hash(Password, saltRounds)

        const user = await Customer.create({ Email, Password: hassPass, UserName, Phone, FullName, 'Address.name': Address, 'Address.lat': Lat, 'Address.lng': Lng, Active });

        let userData = {
            CusId: user.CusId,
        }

        const token = jwt.sign(userData, 'toikhongbietgi');

        let data = {
            token: token,
            fullName: user.FullName,
            phone: user.Phone,
            address: user.Address
        }

        return res.send({ status: 1, results: data });

    } catch (error) {
        return res.send({ status: 0, message: error.message });
    }

};

module.exports.login = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.send({ status: 0, message: errors.array() });
        }

        const { Email, Password } = req.body;

        const customer = await Customer.findOne({ Email: Email });

        if (!customer) {
            return res.send({ status: 0, message: "Email chưa được đăng ký" });
        }
        const validPass = await bcrypt.compare(Password, customer.Password);

        if (!validPass) {
            return res.send({ status: 0, message: "Mật khẩu không đúng" });
        }

        if (customer.Active === false) {
            return res.send({ status: 0, message: "Tài khoản đã bị tạm dừng hoạt động" });
        }

        let dataCustomer = {
            CusId: customer.CusId,
            // Email: customer.Email,
            // FullName: customer.FullName,
            // UserName: customer.customerName,
            // Phone: customer.Phone,
            // Address: customer.Address,
            // Active: customer.Active,
            // Image: customer.Image
        }

        const token = jwt.sign(dataCustomer, 'toikhongbietgi');

        let data = {
            token: token,
            fullName: customer.FullName,
            phone: customer.Phone,
            address: customer.Address
        }

        return res.send({ status: 1, results: data });


    } catch (error) {
        return res.send({ status: 0, message: error.message });
    }
};

module.exports.getAllCustomers = async (req, res) => {

    try {

        const customers = await Customer.find().select('Email UserName Id Phone Active FullName CusId Image Address').sort({ CusId: 'desc' });

        return res.send({ status: 1, results: customers });

    } catch (error) {

        return res.send({ status: 0, message: error.message });

    }
};

// Get detail of user
module.exports.getDetailCustomer = async (req, res) => {

    try {
        const CusId = req.decoded.CusId;
        const customer = await Customer.findOne({ CusId }).select('Email UserName _id Phone FullName Address Active CusId Image');

        return res.send({ status: 1, results: customer });
    } catch (error) {
        return res.send({ status: 0, message: error.message });
    }
}

module.exports.updateActive = async (req, res) => {

    try {

        const CusId = req.params.CusId;

        const { Active } = req.body;

        // Active to inform customer will be stop active or not

        const customer = await Customer.findOneAndUpdate({ CusId }, { Active });

        let cusData = {
            CusId: customer.CusId,
            UserName: customer.UserName,
            Phone: customer.Phone,
            Email: customer.Email,
            Address: customer.Address,
            FullName: customer.FullName,
            Active: customer.Active,
            Image: customer.Image
        }

        return res.send({ status: 1, results: cusData });

    } catch (error) {

        return res.send({ status: 0, message: error.message });

    }
};

module.exports.updateInfo = async (req, res) => {

    try {

        const CusId = req.decoded.CusId;

        const { Phone, Address, Image, Lat, Lng } = req.body;

        // Active to inform customer will be stop active or not

        const customer = await Customer.findOneAndUpdate({ CusId }, { Phone, 'Address.name': Address, Image, 'Address.lat': Lat, 'Address.lng': Lng });

        let cusData = {
            Phone: customer.Phone,
            Address: customer.Address,
            Image: customer.Image
        }

        return res.send({ status: 1, results: cusData });

    } catch (error) {

        return res.send({ status: 0, message: error.message });

    }
};

module.exports.changePassword = async (req, res) => {

    try {
        const CusId = req.decoded.CusId;

        const currentPassword = req.body.currentPass;

        const newPass = req.body.newPass;

        const customer = await Customer.findOne({ CusId });

        const validPass = await bcrypt.compare(currentPassword, customer.Password);

        if (!validPass) {
            return res.send({ status: 0, message: "Mật khẩu không đúng" });
        }

        const hassPass = await bcrypt.hash(newPass, saltRounds);

        const updateUser = await Customer.findOneAndUpdate({CusId}, {Password:hassPass})

        res.send({status: 1, message: 'Thay đổi mật khẩu thành công!'});

    } catch(error) {
        return res.send({ status: 0, message: error.message });
    }
};



