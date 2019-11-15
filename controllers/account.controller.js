const User = require('../models/User');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const saltRounds = 10;

module.exports.login = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.send({ status: 0, message: errors.array() });
        }
        
        const { Email, Password } = req.body;

        const user = await User.findOne({ Email: Email });

        if (!user) {
            return res.send({ status: 0, message: "Email chưa được đăng ký" });
        } 
        const validPass = await bcrypt.compare(Password, user.Password);

        if (!validPass) {
            return res.send({ status: 0, message: "Mật khẩu không đúng" });
        }

        if (user.Active === false) {
            return res.send({ status: 0, message: "Tài khoản đã bị tạm dừng hoạt động" });
        }

        const dataUser = {
            Email: user.Email,
            UserId: user.UserId,
            Phone: user.Phone,
            Role: user.Role,
            AgencyId: user.AgencyId
        }
        
        const token = jwt.sign(dataUser, 'toikhongbietgi');

        const data = {
            token: token,
            role: user.Role
        }

        return res.send({ status: 1, results: data });
        
        
    } catch (error) {
        return res.send({ status: 0, message: error.message });
    }
};

module.exports.getAllEmp = async (req, res) => {

    try {
        
        const users = await User.find({Role: { $in: ['staff', 'minor'] }}).select('Email UserName Id Phone Role AgencyId Active FullName UserId Image').sort({UserId: 'desc'});

        // const validPass = await bcrypt.compare(Password, user.Password);
    
        return res.send({ status: 1, results: users });
    } catch (error) {
        return res.send({ status: 0, message: error.message });
    }
}

// Method get information of list shippers
module.exports.getAllShipper = async (req, res) => {

    try {
        let Role = req.query.Role;
        let AgencyId = req.decoded.AgencyId;

        const users = await User.find( { AgencyId, Role }).select('Email UserName Id Phone Role AgencyId Active FullName UserId Image').sort({UserId: 'desc'});
    
        return res.send({ status: 1, results: users });
    } catch (error) {
        return res.send({ status: 0, message: error.message });
    }
}

//get all user
module.exports.getAllUser = async (req, res) => {

    try {
        
        const users = await User.find().select('Email UserName Id Phone Role AgencyId Active FullName UserId Image').sort({UserId: 'desc'});

        // const validPass = await bcrypt.compare(Password, user.Password);
    
        return res.send({ status: 1, results: users });
    } catch (error) {
        return res.send({ status: 0, message: error.message });
    }
}

module.exports.getAllStaff = async (req, res) => {

    try {
        
        const users = await User.find({Role: 'staff', Active: true}).select('Email UserName Id Phone Role AgencyId Active FullName UserId Image').sort({UserId: 'desc'})

        // const validPass = await bcrypt.compare(Password, user.Password);
    
        return res.send({ status: 1, results: users });
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

        let { Email, Password, Phone, UserName, Role, Active, FullName, Image } = req.body;

        let AgencyId = req.decoded.AgencyId;

        const hassPass = await bcrypt.hash(Password, saltRounds);

        let user = await User.create({ Email, Password:hassPass, UserName, Phone, AgencyId, Role, Active, FullName, Image });

        let data = {
            Email: user.Email,
            UserName: user.UserName,
            Phone: user.Phone,
            AgencyId: user.AgencyId,
            Role: user.Role,
            FullName: user.FullName,
            Image: user.Image,
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
        const { UserName, Phone, AgencyId, Active, FullName, Role, Image } = req.body;

        const UserId  = req.params.UserId;

        const user = await User.findOneAndUpdate({ UserId }, { UserName, Phone, Active, FullName, AgencyId, Role, Image });

        let data = {
            UserId: user.UserId,
            Email: user.Email,
            UserName: user.UserName,
            Phone: user.Phone,
            Role: user.Role,
            Active: user.Active,
            FullName: user.FullName,
            AgencyId: user.AgencyId,
            Image: user.Image
        }

        return res.send({ status: 1, results: data });

    } catch(error) {
        return res.send({ status: 0, message: error.message });
    }
};

// Get detail of user
module.exports.getDetailUser = async (req, res) => {

    try {
        const UserId = req.decoded.UserId;
        const user = await User.findOne({ UserId }).select('Email UserName UserId Phone FullName Active AgencyId Role Image');
    
        return res.send({ status: 1, results: user });
    } catch (error) {
        return res.send({ status: 0, message: error.message });
    }
}

// Delete staff
module.exports.deleteUser = async (req, res) => {

    try {
        const UserId  = req.params.UserId;

        const user = await User.findOneAndRemove({ UserId });

        return res.send({ status: 1, message: 'Xoá thành công' });

    } catch(error) {
        return res.send({ status: 0, message: error.message });
    }
};

module.exports.changePassword = async (req, res) => {

    try {
        const UserId  = req.decoded.UserId;

        const currentPassword = req.body.currentPass;

        const newPass = req.body.newPass;

        const user = await User.findOne({ UserId });

        const validPass = await bcrypt.compare(currentPassword, user.Password);

        if (!validPass) {
            return res.send({ status: 0, message: "Mật khẩu không đúng" });
        }

        const hassPass = await bcrypt.hash(newPass, saltRounds);

        const updateUser = await User.findOneAndUpdate({UserId}, {Password:hassPass})

        res.send({status: 1, message: 'Thay đổi mật khẩu thành công!'});

    } catch(error) {
        return res.send({ status: 0, message: error.message });
    }
};

// module.exports.uploadImage = (req, res, next) => {
    
// }