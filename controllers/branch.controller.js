const Agency = require('../models/Branch');
const User = require('../models/User');
const Order = require('../models/Order');

module.exports.getAllAgencys = async (req, res) => {

    try {
        const userRole = req.decoded.Role;

        const agencys = await Agency.find().sort({ AgencyId: 'desc' });

        const admins = await User.find({ Role: 'minor' });

        let result = [];
        agencys.forEach(agency => {
            let indexAgency = admins.findIndex(x => x.AgencyId == agency.AgencyId)
            if (indexAgency >= 0) {
                result.push({
                    'brand': agency,
                    'admin': admins[indexAgency]
                })
            }
        })
        return res.send({ status: 1, results: result });

    } catch (error) {

        return res.send({ status: 0, message: error.message });

    }
};

module.exports.creatAgency = async (req, res) => {

    try {
        const { AgencyName, Phone, Active, Address, Lat, Lng } = req.body;

        const agency = await Agency.create({ AgencyName, Phone, 'Address.name': Address, 'Address.lat': Lat, 'Address.lng': Lng, Active, });

        return res.send({ status: 1, results: agency });

    } catch (error) {

        return res.send({ status: 0, message: error.message });

    }
};

module.exports.getAgencyInfo = async (req, res) => {
    try {
        const { AgencyId } = req.param;

        const agency = await Agency.findOne({ AgencyId });

        return res.send({ status: 1, results: agency });

    } catch (error) {

        return res.send({ status: 0, message: error.message });

    }
};

module.exports.updateAgency = async (req, res) => {

    try {

        const AgencyId = req.params.AgencyId;

        const { AgencyName, Phone, Address, Lat, Lng, Active } = req.body;

        // Active to inform agency will be stop active or not

        const agency = await Agency.findOneAndUpdate({ AgencyId }, { AgencyName, Phone, 'Address.name': Address, 'Address.lat': Lat, 'Address.lng': Lng, Active });

        return res.send({ status: 1, results: agency });

    } catch (error) {

        return res.send({ status: 0, message: error.message });

    }
};

module.exports.deleteAgency = async (req, res) => {

    try {

        const AgencyId = req.params.AgencyId;

        const agency = await Agency.findOneAndRemove({ AgencyId });

        return res.send({ status: 1, message: 'deleted successfully' });

    } catch (error) {

        return res.send({ status: 0, message: error.message });

    }
};

module.exports.reportAllAgency = async (req, res) => {
    try {

        let fromDate = req.body.fromDate;

        let toDate = req.body.toDate;

        const agencys = await Agency.find().sort({ AgencyId: 'desc' });

        let result = [];

        await Promise.all(
            agencys.map(async agency => {
                let AgencyIdCreate = AcceptAdminId = agency.AgencyId;

                let totalOrders = await Order.countDocuments({
                    $or:
                        [
                            { AgencyIdCreate, CreatedTime: { "$gte": fromDate, "$lt": toDate } },
                            { 'AcceptAdminId.AdminId': AcceptAdminId, 'AcceptAdminId.acceptTime': { "$gte": fromDate, "$lt": toDate } }
                        ]
                });

                let orders = await Order.find({
                    $or:
                        [
                            { AgencyIdCreate, 'OrderStatus.name': 'success', CreatedTime: { "$gte": fromDate, "$lt": toDate } },
                            { 'AcceptAdminId.AdminId': AcceptAdminId, 'OrderStatus.name': 'success', 'AcceptAdminId.acceptTime': { "$gte": fromDate, "$lt": toDate } }
                        ]
                });

                let totalRevenue = orders.reduce((currentPrice, order) => {
                    return currentPrice + order.TransportCharge;
                }, 0);

                result.push({
                    agencyName: agency.AgencyName,
                    totalOrders: totalOrders,
                    totalRevenue: totalRevenue
                });
            })
        )

        return res.send({ status: 1, results: result });

    } catch (error) {

        return res.send({ status: 0, message: error.message });

    }
}



