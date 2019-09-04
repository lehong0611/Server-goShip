const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');

autoIncrement.initialize(mongoose.connection);

const statusSchema = new mongoose.Schema({
    Id: {
        type: Number,
        required: true,
        unique: true
    },
    Name: {
        type: String,
        required: true,
    },
    Date: {
        type: Date,
        required: Date.now
    },
    OrderId: {
        type: Number,
        required: true
    }
});

statusSchema.plugin(autoIncrement.plugin, {
	model: 'Status', field: 'Id'
});

module.exports = mongoose.model('Status', statusSchema);
