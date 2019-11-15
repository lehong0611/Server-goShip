const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');

autoIncrement.initialize(mongoose.connection);

const customerSchema = new mongoose.Schema({
    CusId: {
        type: Number,
        required: true,
        unique: true
    },
    FullName: {
        type: String,
        required: true
    },
    UserName: {
        type: String
    },
    Email: {
        type: String,
        required: true
    },
    Password: {
        type: String,
        required: true,
        min: 8
    },
    Phone: {
        type: String,
        required: true,
    },
    Address: {
        name: {
            type: String,
            required: true
        },
        lat: {
            type: Number,
            required: true
        },
        lng: {
            type: Number,
            required: true
        }
    },
    Active: {
        type: Boolean,
        default: true
    }, 
    Image: {
        type: String
    }
});


customerSchema.plugin(autoIncrement.plugin, {
	model: 'Customer', field: 'CusId'
});

module.exports = mongoose.model('Customer', customerSchema);
