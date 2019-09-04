const User = require('../models/User');
const Customer = require('../models/Customer');
const { validationResult } = require('express-validator');
const uuidv1  = require('uuid/v1');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const saltRounds = 10;

// Register of customer
module.exports.register = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.send({ status: 0, message: errors.array() });
        }
        
        const { Email, Password, UserName, PhoneNumber, FullName, Address, Active, Image } = req.body;

        const hassPass = await bcrypt.hash(Password, saltRounds)
        
        const user = await Customer.create({ Id: uuidv1(), Email, Password:hassPass, UserName, PhoneNumber, FullName, Address, Active, Image });

        let userData = {
            Id: user.Id,
            email: user.Email,
            fullName: user.FullName,
            userName: user.UserName,
            phone: user.PhoneNumber,
            address: user.Address
        }

        return res.send({ status: 1, results: userData });
        
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
        
        const { Email, Password } = req.query;

        const user = await User.findOne({ Email: Email });

        if (!user) {
            return res.send({ status: 0, message: "Email chưa được đăng ký" });
        } 
        const validPass = await bcrypt.compare(Password, user.Password);

        if (!validPass) {
            return res.send({ status: 0, message: "Mật khẩu không đúng" });
        }

        const { UserName, Id, PhoneNumber, Role } = user;
        
        const token = jwt.sign({ Id }, 'toikhongbietgi');

        res.header('auth-token', token);

        return res.send({ status: 1, results: { Email: user.Email, UserName, Id, PhoneNumber, Role }, token });
        
        
    } catch (error) {
        return res.send({ status: 0, message: error.message });
    }
};

// Method get information of staff, shipper
module.exports.getAllUserByRole = async (req, res) => {

    try {
        let { Role, AgencyId } = req.body;

        const users = await User.find({ AgencyId, Role }).select('Email UserName Id PhoneNumber Role AgencyId Active FullName');
    
        return res.send({ status: 1, results: users });
    } catch (error) {
        return res.send({ status: 0, message: error.message });
    }
}

//get all customer
module.exports.getAllCustomer = async (req, res) => {

    try {

        const customers = await Customer.find().select('Email UserName Id PhoneNumber FullName Adress Active');
    
        return res.send({ status: 1, results: customers });
    } catch (error) {
        return res.send({ status: 0, message: error.message });
    }
}

//Shipper Or Staff
module.exports.createUser = async (req, res) => {

    try {

        const errors = validationResult(req);
            
        if (!errors.isEmpty()) {
            return res.send({ status: 0, message: errors.array() });
        }

        let { Email, Password, PhoneNumber, UserName, AgencyId, Role, Active, FullName } = req.body;

        const hassPass = await bcrypt.hash(Password, saltRounds);

        let user = await User.create({ Id: uuidv1(), Email, Password:hassPass, UserName, PhoneNumber, AgencyId, Role, Active, FullName });

        let data = {
            Email: user.Email,
            UserName: user.UserName,
            PhoneNumber: user.PhoneNumber,
            AgencyId: user.AgencyId,
            Role: user.Role,
            FullName: user.FullName,
            Active: user.Active
        }

        return res.send({ status: 1, results: data });

    } catch(error) {

        return res.send({ status: 0, message: error.message });

    }
};

//Update shipper and staff include status active and change password
module.exports.updateUser = async (req, res) => {

    try {
        const { UserName, PhoneNumber, AgencyId, Id, Active, Password, FullName } = req.body;

        const user = await User.findOneAndUpdate({ Id }, { UserName, PhoneNumber, Active, Password, FullName, AgencyId });

        let data = {
            Email: user.Email,
            UserName: user.UserName,
            PhoneNumber: user.PhoneNumber,
            Role: user.Role,
            Active: user.Active,
            FullName: user.FullName,
            AgencyId: user.AgencyId
        }

        return res.send({ status: 1, results: data });

    } catch(error) {
        return res.send({ status: 0, message: error.message });
    }
};

//update customer include change password and inactive customer
module.exports.updateCustomer = async (req, res) => {
    try {
        const { UserName, PhoneNumber, Id, Password, FullName, Address } = req.body;

        const customer = await Customer.findOneAndUpdate({ Id }, { UserName, PhoneNumber, Password, FullName, Address });

        let data = {
            Email: customer.Email,
            UserName: customer.UserName,
            PhoneNumber: customer.PhoneNumber,
            FullName: customer.FullName,
            Address: customer.Address,
            Active: customer.Active
        }

        return res.send({ status: 1, results: data });

    } catch(error) {
        return res.send({ status: 0, message: error.message });
    }
};

// Get detail of user
module.exports.getDetailUser = async (req, res) => {

    try {
        const { Id } = req.param;
        const user = await User.findOne({ Id }).select('Email UserName Id PhoneNumber FullName Active AgencyId');
    
        return res.send({ status: 1, results: user });
    } catch (error) {
        return res.send({ status: 0, message: error.message });
    }
}

// Get detail of user
module.exports.getDetailCustomer = async (req, res) => {

    try {
        const { Id } = req.query;
        const customer = await Customer.findOne({ Id }).select('Email UserName Id PhoneNumber FullName Address Active');
    
        return res.send({ status: 1, results: customer });
    } catch (error) {
        return res.send({ status: 0, message: error.message });
    }
}







