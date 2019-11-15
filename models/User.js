const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');

autoIncrement.initialize(mongoose.connection);

const userSchema = new mongoose.Schema({
    UserId: {
        type: Number,
        required: true,
        unique: true
    },
    FullName: {
        type: String,
        required: true
    },
    UserName: {
        type: String,
        required: true,
    },
    Email: {
        type: String,
        required: true,
        unique: true
    },
    Password: {
        type: String,
        required: true
    },
    Phone: {
        type: String
    },
    Image: {
        type: String
    },
    Role: {
        type: String,
        required: true,
    },
    AgencyId: {
        type: Number
    },
    Active: {
        type: Boolean,
        default: true
    }
});

userSchema.plugin(autoIncrement.plugin, {
	model: 'User', field: 'UserId'
});

module.exports = mongoose.model('User', userSchema);
