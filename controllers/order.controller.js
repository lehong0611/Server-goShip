const Order = require('../models/Order');
const Customer = require('../models/Customer');
const User = require('../models/User');


// get All Orders

module.exports.getAllOrderByStatus = async (req, res) => {

    try {

        let page = parseInt(req.query.page);
        let pageSize = parseInt(req.query.pageSize);

        const OrderStatus = req.query.OrderStatus;

        const CreatedUserId = req.decoded.CusId;

        const counts = await Order.countDocuments({ 'OrderStatus.name': OrderStatus, CreatedUserId: CreatedUserId });

        const orders = await Order.find({ 'OrderStatus.name': OrderStatus, CreatedUserId })
            .sort({ OrderId: -1 })
            .skip(page > 0 ? ((page - 1) * pageSize) : 0)
            .limit(pageSize);

        let data = {
            counts: counts,
            orders: orders
        }
        return res.send({ status: 1, results: data });

    } catch (error) {

        return res.send({ status: 0, message: error.message });

    }
};

module.exports.getOrderforAgency = async (req, res) => {

    try {

        let page = parseInt(req.query.page);
        let pageSize = parseInt(req.query.pageSize);

        const OrderStatus = req.query.OrderStatus;

        const AdminId = req.decoded.AgencyId;

        const AgencyIdCreate = req.decoded.AgencyId;

        const counts = await Order.countDocuments({ $or: [{ AgencyIdCreate, 'OrderStatus.name': OrderStatus }, { 'AcceptAdminId.AdminId': AdminId, 'OrderStatus.name': OrderStatus }] });

        const orders = await Order.find({ $or: [{ AgencyIdCreate, 'OrderStatus.name': OrderStatus }, { 'AcceptAdminId.AdminId': AdminId, 'OrderStatus.name': OrderStatus }] })
            .sort({ OrderId: -1 })
            .skip(page > 0 ? ((page - 1) * pageSize) : 0)
            .limit(pageSize);

        let data = {
            counts: counts,
            orders: orders
        }

        return res.send({ status: 1, results: data });

    } catch (error) {

        return res.send({ status: 0, message: error.message });

    }
};

module.exports.getSuccessOrFailGet = async (req, res) => {
    try {

        let page = parseInt(req.query.page);
        let pageSize = parseInt(req.query.pageSize);

        const ShipperGetOrderId = req.decoded.UserId;

        const counts = await Order.countDocuments({
            ShipperGetOrderId, 'Taken.isSuccess': { $in: [true, false] }
        });
        const orders = await Order.find({
            ShipperGetOrderId, 'Taken.isSuccess': { $in: [true, false] }
        }).sort({ OrderId: -1 })
            .skip(page > 0 ? ((page - 1) * pageSize) : 0)
            .limit(pageSize);

        let data = {
            counts: counts,
            orders: orders
        }

        return res.send({ status: 1, results: data });

    } catch (error) {

        return res.send({ status: 0, message: error.message });

    }
};

module.exports.getSuccessOrFailTrans = async (req, res) => {
    try {

        let page = parseInt(req.query.page);
        let pageSize = parseInt(req.query.pageSize);

        const ShipperTransId = req.decoded.UserId;

        const counts = await Order.countDocuments({ ShipperTransId, 'OrderStatus.name': { $in: ['success', 'failed'] } });
        const orders = await Order.find({
            ShipperTransId, 'OrderStatus.name': { $in: ['success', 'failed'] }
        }).sort({ OrderId: -1 })
            .skip(page > 0 ? ((page - 1) * pageSize) : 0)
            .limit(pageSize);

        let data = {
            counts: counts,
            orders: orders
        }

        return res.send({ status: 1, results: data });

    } catch (error) {

        return res.send({ status: 0, message: error.message });

    }
};

module.exports.getOrderByShipperGet = async (req, res) => {
    try {

        let page = parseInt(req.query.page);
        let pageSize = parseInt(req.query.pageSize);

        const ShipperGetOrderId = req.decoded.UserId;

        const counts = await Order.countDocuments({ 'OrderStatus.name': { $in: ['unavailable', 'taken'] }, ShipperGetOrderId });
        const orders = await Order.find({ 'OrderStatus.name': { $in: ['unavailable', 'taken'] }, ShipperGetOrderId })
            .sort({ OrderId: -1 })
            .skip(page > 0 ? ((page - 1) * pageSize) : 0)
            .limit(pageSize);

        let data = {
            counts: counts,
            orders: orders
        }
        return res.send({ status: 1, results: data });

    } catch (error) {

        return res.send({ status: 0, message: error.message });

    }
};

module.exports.getOrderByShipperTrans = async (req, res) => {
    try {

        let page = parseInt(req.query.page);
        let pageSize = parseInt(req.query.pageSize);

        const OrderStatus = req.query.OrderStatus;

        const ShipperTransId = req.decoded.UserId;

        const counts = await Order.countDocuments({ 'OrderStatus.name': OrderStatus, ShipperTransId });
        const orders = await Order.find({ 'OrderStatus.name': OrderStatus, ShipperTransId })
            .sort({ OrderId: -1 })
            .skip(page > 0 ? ((page - 1) * pageSize) : 0)
            .limit(pageSize);

        let data = {
            counts: counts,
            orders: orders
        }
        return res.send({ status: 1, results: data });

    } catch (error) {

        return res.send({ status: 0, message: error.message });

    }
};

module.exports.getAllOrderByAllCondition = async (req, res) => {
    try {

        const { OrderStatus, Service, CreatedDate, CreatedUserId, ShipperId } = req.query;

        const orders = await Order.find({ OrderStatus, Service, CreatedDate, CreatedUserId, ShipperId });

        return res.send({ status: 1, results: orders });

    } catch (error) {

        return res.send({ status: 0, message: error.message });

    }
};

// Tạo đơn hàng bởi admin chi nhánh hoặc khách hàng
module.exports.createOrder = async (req, res) => {
    try {

        let CreatedUserId = '';
        let AgencyIdCreate = '';

        const { SenderName, SenderPhone, SenderAddress, ReceiverName, ReceiverPhone,
            ReceiverAddress, Weight, Kind, Note, Service, AdminId, AcceptTime,
            Cost, reassignAgencyId, ShipperGetOrderId, ShipperTransId,
            TransportCharge, EstimatedTime, TextReject } = req.body;

        if (req.decoded.UserId && req.decoded.AgencyId) {
            CreatedUserId = req.decoded.UserId;
            AgencyIdCreate = req.decoded.AgencyId;
        } else {
            CreatedUserId = req.decoded.CusId;
            AgencyIdCreate = '';
        }

        const OrderStatus = {
            name: req.body.OrderStatusName,
            time: req.body.OrderStatusTime
        }

        const order = await Order.create({
            SenderName, SenderPhone, SenderAddress, ReceiverName, ReceiverPhone, ReceiverAddress,
            Weight, Kind, Note, CreatedTime: OrderStatus.time, CreatedUserId, Service,
            Cost, OrderStatus, reassignAgencyId, ShipperTransId, ShipperGetOrderId, TransportCharge,
            EstimatedTime, TextReject, AgencyIdCreate: AgencyIdCreate, 'AcceptAdminId.AdminId': AdminId,
            'AcceptAdminId.acceptTime': AcceptTime
        });

        return res.send({ status: 1, results: order });

    } catch (error) {

        return res.send({ status: 0, message: error.message });

    }
};

// search order
module.exports.getOrderInfoById = async (req, res) => {
    try {
        let listOrder = [];

        const id = req.params._id;

        const order = await Order.findById({ '_id': id });

        listOrder.push(order);

        return res.send({ status: 1, results: listOrder });

    } catch (error) {

        return res.send({ status: 0, message: error.message });

    }
};

module.exports.detailOrder = async (req, res) => {
    try {
        const OrderId = req.body.OrderId;

        const order = await Order.findOne({ OrderId });

        return res.send({ status: 1, results: order });

    } catch (error) {

        return res.send({ status: 0, message: error.message });

    }
};

//Including change status order
// Nếu trạng thái đơn hàng là mới tạo có thể sửa thông tin người gửi, người nhận, kích thươc, dịch vụ, giá tiền, ngày sửa cuối
// Nếu trạng thái là đang giao, cập nhật shipper
// Còn lại chỉ cập nhật trạng thái
module.exports.updateOrderById = async (req, res) => {

    try {
        const { SenderName, SenderPhoneNumber, SenderAddress, ReceiverName, ReceiverPhoneNumber,
            ReceiverAddress, Weight, Kind, Note, Service, Cost, ShipperGetOrderId, ShipperTransId,
            reassignAgencyId, OrderStatusName, OrderStatusTime, EstimatedTime, TransportCharge,
            TextReject, isTakeSuccess, TakeTime, AdminId, AcceptTime
        } = req.body;

        const OrderId = req.params.OrderId;

        const order = await Order.findOneAndUpdate({ OrderId }, {
            SenderName, SenderPhoneNumber, SenderAddress, ReceiverName, ReceiverPhoneNumber,
            ReceiverAddress, Weight, Note, Kind, Service, Cost, ShipperGetOrderId, ShipperTransId,
            reassignAgencyId, 'OrderStatus.name': OrderStatusName, 'OrderStatus.time': OrderStatusTime,
            'Taken.isSuccess': isTakeSuccess, 'Taken.date': TakeTime, TransportCharge, EstimatedTime,
            TextReject, 'AcceptAdminId.AdminId': AdminId, 'AcceptAdminId.acceptTime': AcceptTime
        });

        return res.send({ status: 1, results: order });

    } catch (error) {

        return res.send({ status: 0, message: error.message });

    }
};

// Chỉ khách hàng được phép xóa đơn hàng
module.exports.deleteOrderById = async (req, res) => {
    try {
        const OrderId = req.params.OrderId;

        const order = await Order.findOneAndRemove({ OrderId });

        return res.send({ status: 1, message: 'Deleted successfully !' });

    } catch (error) {

        return res.send({ status: 0, message: error.message });

    }
};

module.exports.report = async (req, res) => {
    try {
        // let AgencyIdCreate = req.decoded.AgencyId;
        let fromDate = req.body.fromDate;

        let toDate = req.body.toDate;

        let AgencyIdCreate = AdminId = req.decoded.AgencyId;

        let totalOrders = await Order.countDocuments({
            $or:
                [
                    { AgencyIdCreate, CreatedTime: { "$gte": fromDate, "$lt": toDate } },
                    { 'AcceptAdminId.AdminId': AdminId, 'AcceptAdminId.acceptTime': { "$gte": fromDate, "$lt": toDate } }
                ]
        });

        let orders = await Order.find({
            $or:
                [
                    { AgencyIdCreate, CreatedTime: { "$gte": fromDate, "$lt": toDate } },
                    { 'AcceptAdminId.AdminId': AdminId, 'AcceptAdminId.acceptTime': { "$gte": fromDate, "$lt": toDate } }
                ]
        });

        let totalRevenue = orders.reduce((currentPrice, order) => {
            return currentPrice + order.TransportCharge;
        }, 0);

        let orderSuccess = await Order.countDocuments({
            $or:
                [
                    { AgencyIdCreate, 'OrderStatus.name': 'success', CreatedTime: { "$gte": fromDate, "$lt": toDate } },
                    { 'AcceptAdminId.AdminId': AdminId, 'OrderStatus.name': 'success', 'AcceptAdminId.acceptTime': { "$gte": fromDate, "$lt": toDate } }
                ]
        });

        let orderFail = await Order.countDocuments({
            $or:
                [
                    { AgencyIdCreate, 'OrderStatus.name': { $in: ['failed', 'miss-taken']}, CreatedTime: { "$gte": fromDate, "$lt": toDate } },
                    { 'AcceptAdminId.AdminId': AdminId, 'OrderStatus.name': { $in: ['failed', 'miss-taken']}, 'AcceptAdminId.acceptTime': { "$gte": fromDate, "$lt": toDate } }
                ]
        });

        let data = {
            totalOrders: totalOrders,
            totalRevenue: totalRevenue,
            orderSuccess: orderSuccess,
            orderFail: orderFail,
        }

        return res.send({ status: 1, results: data });

    } catch (err) {
        return res.send({ status: 0, message: err.message });
    }
}




