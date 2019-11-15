const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');

autoIncrement.initialize(mongoose.connection);

const orderSchema = new mongoose.Schema({
    OrderId: {
        type: Number,
        required: true,
        unique: true
    },
    // Trong trường hợp khách lẻ, thông tin của khách chính là senderName
    SenderName: {
        type: String,
        required: true,
    },
    SenderPhone: {
        type: String,
        required: true
    },
    SenderAddress: {
        type: String,
        required: true
    },
    ReceiverName: {
        type: String,
        required: true
    },
    ReceiverPhone: {
        type: String,
        required: true,
    },
    ReceiverAddress: {
        type: String,
        required: true
    },
    Weight: {
        type: Number,
        required: true
    },
    Kind: {
        type: Number,
        required: true
    },
    Note: {
        type: String
    },
    //Thời gian tạo đơn bao gồm giờ phút
    CreatedTime: {
        type: Date,
        required: true,
        default: new Date()
    },
    // amin cua chi nhanh or khach hang
    CreatedUserId: {
        type: Number,
        required: true
    },
    AgencyIdCreate: {
        type: Number
    },
    // nhanh, chuẩn, tiết kiệm
    Service: {
        type: String,
        required: true,
    },
    // admin đại lý nào xác nhận đơn hàng
    AcceptAdminId: {
        AdminId: {type: Number},
        acceptTime: {type: Date}
    },
    // Đại lý tiếp nhận đơn hàng
    reassignAgencyId: {
        type: Number
    },
    Cost: {
        type: Number,
        require: true
    },
    ShipperGetOrderId: {
        type: Number,
    },
    ShipperTransId: {
        type: Number
    },
    // Mới tạo, Đang giao, Giao thành công, Chờ giao lại, Thất bại
    OrderStatus: {
        name: {type: String, required: true},
        time: { type: Date, required: true, default: new Date()},
    },
    TransportCharge: {
        type: Number
    }, 
    EstimatedTime: {
        type: Date
    },
    TextReject: {
        type: String
    },
    Taken: {
        isSuccess: {type: Boolean},
        date: { type: Date }
    }
});

orderSchema.plugin(autoIncrement.plugin, {
	model: 'Order', field: 'OrderId'
});

module.exports = mongoose.model('Order', orderSchema);
