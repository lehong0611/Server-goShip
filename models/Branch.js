const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');

autoIncrement.initialize(mongoose.connection);

const agencySchema = new mongoose.Schema({
    AgencyId: {
        type: Number,
        required: true,
        unique: true
    },
    AgencyName: {
        type: String,
        required: true,
    },
    Phone: {
        type: String,
        max: 10,
        default: ''
    },
    Address: {
        type: String,
        required: true
    },
    Active: {
        type: Boolean,
        required: true,
        default: true
    }

});

agencySchema.plugin(autoIncrement.plugin, {
	model: 'Agency', field: 'AgencyId'
});

module.exports = mongoose.model('Agency', agencySchema);
