const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');

autoIncrement.initialize(mongoose.connection);

const orderSchema = new mongoose.Schema({
    OrderId: {
        type: Number,
        required: true,
        unique: true
    },
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
    ReceiverPhoner: {
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
        type: String,
        required: true
    },
    Note: {
        type: String
    },
    //Thời gian tạo đơn bao gồm giờ phút
    CreatedTime: {
        type: Date,
        required: true,
        default: Date.now
    },
    // amin cua chi nhanh or khach hang
    CreatedUserId: {
        type: Number,
        required: true
    },
    // Thông tin cua khách lẻ
    GuestName: {
        type: String,
        required: true
    },
    GuestPhone: {
        type: String,
        required: true,
        max: 10
    },
    GuestAddress: {
        type: String,
        required: true
    },
    // end phần thông tin
    // nhanh, chuẩn, tiết kiệm
    Service: {
        type: String,
        required: true,
    },
    // admin đại lý nào xác nhận đơn hàng
    AcceptAdminId: {
        type: Number
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
        type: String,
    },
    ShipperTransId: {
        type: String
    },
    AddressGetOrder: {
        type: String
    },
    // Mới tạo, Đang giao, Giao thành công, Chờ giao lại, Thất bại
    OrderStatusId: {
        type: Number,
        required: true,

    },
    TransportCharge: {
        type: Number
    }, 
    EstimatedTime: {
        type: Date
    }
});

agencySchema.plugin(autoIncrement.plugin, {
	model: 'Order', field: 'OrderId'
});

module.exports = mongoose.model('Order', orderSchema);
