
const jwt = require("jsonwebtoken");
const User = require('../models/User');

function isAuthorized(req, res, next) {
    if (req.headers && req.headers.authorization) {
        jwt.verify(req.headers.authorization.split(' ')[0], 'toikhongbietgi', function (err, decoded) {
            if (err) {
                console.log(err);
                res.status(500).json({ error: "Not Authorized" });
                throw new Error("Not Authorized");
            } else {
                req.decoded = decoded;
                next();
            }
        });
    } else {
        res.status(500).json({ error: "Not Authorized" });
        throw new Error("Not Authorized");
    }
}

module.exports = {
    isAuthorized
}