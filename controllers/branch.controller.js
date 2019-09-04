const Agency = require('../models/Branch');
const uuidv1  = require('uuid/v1');

module.exports.getAllAgencys = async (req, res) => {

    try {

        const agencys = await Agency.find();

        return res.send({ status: 1, results: agencys });

    } catch(error) {

        return res.send({ status: 0, message: error.message });

    }

    
};

module.exports.creatAgency = async (req, res) => {

    try {
        const { AgencyName, PhoneNumber, Address, Active } = req.body;

        const agency = await Agency.create({ AgencyId: uuidv1(), AgencyName, PhoneNumber, Address, Active });

        return res.send({ status: 1, results: agency });

    } catch(error) {

        return res.send({ status: 0, message: error.message });

    }
};

module.exports.getAgencyInfo = async (req, res) => {
    try {
        const { AgencyId } = req.param;

        const agency = await Agency.findOne({ AgencyId });

        return res.send({ status: 1, results: agency });

    } catch(error) {

        return res.send({ status: 0, message: error.message });
        
    }
};

module.exports.updateAgency = async (req, res) => {

    try {
        const { AgencyId, AgencyName, PhoneNumber, Address, Active } = req.body;

        // Active to inform agency will be stop active or not

        const agency = await Agency.findOneAndUpdate({ AgencyId }, { AgencyName, PhoneNumber, Address, Active });

        return res.send({ status: 1, results: agency });

    } catch(error) {

        return res.send({ status: 0, message: error.message });

    }
};



