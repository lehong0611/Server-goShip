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
        max: 11
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
        required: true,
        default: true
    }

});

agencySchema.plugin(autoIncrement.plugin, {
	model: 'Agency', field: 'AgencyId'
});

module.exports = mongoose.model('Agency', agencySchema);
