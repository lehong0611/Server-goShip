const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');

autoIncrement.initialize(mongoose.connection);

const feeSchema = new mongoose.Schema({
    FeeId: {
        type: Number,
        required: true,
        unique: true
    },
    Weigh: {
        type: Number,
        required: true,
    },
    Kind: {
        type: Number,
        required: true
    },
    Distance: {
        type: Number,
        required: true
    },
    Service: {
        type: String,
        required: true
    },
    Value: {
        type: Number,
        required: true,
    },
    // phí lấy về hay phí giao đi
    Type: {
        type: Number,
        required: true
    }, 
    EstimateTime: {
        type: String,
    }
});

feeSchema.plugin(autoIncrement.plugin, {
	model: 'Fee', field: 'FeeId'
});

module.exports = mongoose.model('Fee', feeSchema);
