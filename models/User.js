const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');

autoIncrement.initialize(mongoose.connection);

const userSchema = new mongoose.Schema({
    userId: {
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
        required: true,
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
        max: 10,
        default: ''
    },
    image: {
        type: String
    },
    role: {
        type: String,
        required: true,
    },
    agencyId: {
        type: Number
    },
    active: {
        type: Boolean,
        default: true
    }
});

userSchema.plugin(autoIncrement.plugin, {
	model: 'User', field: 'UserID'
});

module.exports = mongoose.model('User', userSchema);
