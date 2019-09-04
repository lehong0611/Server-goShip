const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');

autoIncrement.initialize(mongoose.connection);

const feeSchema = new mongoose.Schema({
    Id: {
        type: Number,
        required: true,
        unique: true
    },
    Weigh: {
        type: Number,
        required: true,
    },
    Distance: {
        type: String,
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
    }
});

agencySchema.plugin(autoIncrement.plugin, {
	model: 'Fee', field: 'Id'
});

module.exports = mongoose.model('Fee', feeSchema);
