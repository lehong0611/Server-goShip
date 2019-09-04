const Order = require('../models/Order');
const uuidv1  = require('uuid/v1');

// get order by Mới tạo, Đang giao, Giao thành công, Chờ giao lại, Thất bại
module.exports.getAllOrderByStatus = async (req, res) => {

    try {

        const { OrderStatus } = req.query;

        const orders = await Order.find({ OrderStatus });

        return res.send({ status: 1, results: orders });

    } catch(error) {

        return res.send({ status: 0, message: error.message });

    }
};

//Find all order by express, normal, saving
module.exports.getAllOrderByService = async (req, res) => {
    try {

        const { Service } = req.query;

        const orders = await Order.find({ Service });

        return res.send({ status: 1, results: orders });

    } catch(error) {

        return res.send({ status: 0, message: error.message });

    }
};

module.exports.getAllOrderByDate = async (req, res) => {
    try {

        const { CreatedDate } = req.query;

        const orders = await Order.find({ CreatedDate });

        return res.send({ status: 1, results: orders });

    } catch(error) {

        return res.send({ status: 0, message: error.message });

    }
};

module.exports.getAllOrderByAgency = async (req, res) => {
    try {

        const { CreatedUserId } = req.query;

        const orders = await Order.find({ CreatedUserId });

        return res.send({ status: 1, results: orders });

    } catch(error) {

        return res.send({ status: 0, message: error.message });

    }
};

module.exports.getAllOrderByShipper = async (req, res) => {
    try {

        const { ShipperId } = req.query;

        const orders = await Order.find({ ShipperId });

        return res.send({ status: 1, results: orders });

    } catch(error) {

        return res.send({ status: 0, message: error.message });

    }
};

module.exports.getAllOrderByAllCondition = async (req, res) => {
    try {

        const { OrderStatus, Service, CreatedDate, CreatedUserId, ShipperId } = req.query;

        const orders = await Order.find({ OrderStatus, Service, CreatedDate, CreatedUserId, ShipperId });

        return res.send({ status: 1, results: orders });

    } catch(error) {

        return res.send({ status: 0, message: error.message });

    }
};

// Tạo đơn hàng bởi admin chi nhánh hoặc khách hàng
module.exports.creatOrder = async (req, res) => {
    try {
        const { SenderName, SenderPhoneNumber, SenderAddress, ReceiverName, ReceiverPhoneNumber, 
            ReceiverAddress, PackageWeight, KindOfOrder, NoteRequired, CreatedTime,
            CreatedUserId, Service, Cost, ShipperGetOrderId, ShipperTransId, OrderStatus,
            TransportCharge, EstimatedTime, CodeOrder, HistoryStatus } = req.body;

        const order = await Order.create({ OrderId:uuidv1(), SenderName, SenderPhoneNumber, 
            SenderAddress, ReceiverName, ReceiverPhoneNumber, ReceiverAddress, PackageWeight, 
            KindOfOrder, NoteRequired, CreatedTime, CreatedUserId, Service, Cost, 
            ShipperGetOrderId, ShipperTransId, OrderStatus, TransportCharge, EstimatedTime,
            CodeOrder, HistoryStatus });

        return res.send({ status: 1, results: order });

    } catch(error) {

        return res.send({ status: 0, message: error.message });

    }
};

module.exports.getOrderInfoById = async (req, res) => {
    try {
        const { OrderId } = req.param;

        const order = await Order.findOne({ OrderId });

        return res.send({ status: 1, results: order });

    } catch(error) {

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
            ReceiverAddress, PackageWeight, KindOfOrder, NoteRequired, Service, Cost, OrderStatus, 
            ShipperGetOrderId, ShipperTransId, TimeHistory, UserHistoryId } = req.body;

        const { OrderId } = req.query;

        const order = await Order.findOneAndUpdate({ OrderId }, { SenderName, SenderPhoneNumber, 
            SenderAddress, ReceiverName, ReceiverPhoneNumber, ReceiverAddress, PackageWeight, NoteRequired, 
            Service, Cost, OrderStatus, KindOfOrder, ShipperGetOrderId, ShipperTransId, 
            $set: { 'HistoryStatus.UserId': UserHistoryId, 'HistoryStatus.Status': req.body.OrderStatus, 'HistoryStatus.Time': TimeHistory } });

        return res.send({ status: 1, results: order });

    } catch(error) {

        return res.send({ status: 0, message: error.message });

    }
};

// Chỉ được phép xóa đơn hàng bởi amdin chi nhánh với trạng thái đơn hàng là mới tạo
// Không thể xóa khi đơn hàng có các trạng thái còn lại
module.exports.deleteOrderByIdAndStatus = async (req, res) => {
    try {
        const { OrderId } = req.query;

        const order = await Order.findOne({ OrderId });

        return res.send({ status: 1, results: order });

    } catch(error) {

        return res.send({ status: 0, message: error.message });
        
    }
};



