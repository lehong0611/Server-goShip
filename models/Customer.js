const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');

autoIncrement.initialize(mongoose.connection);

const customerSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true,
        unique: true
    },
    fullName: {
        type: String,
        required: true
    },
    userName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        min: 8
    },
    phone: {
        type: String,
        required: true,
        max: 10,
        default: ''
    },
    address: {
        type: String,
        required: true
    },
    active: {
        type: Boolean,
        default: true
    }, 
    image: {
        type: String
    }
});

customerSchema.plugin(autoIncrement.plugin, {
	model: 'Customer', field: 'id'
});

module.exports = mongoose.model('Customer', customerSchema);
