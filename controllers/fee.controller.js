const Fee = require('../models/Fee');
const uuidv1  = require('uuid/v1');

module.exports.getAllFees = async (req, res) => {

    try {

        const fees = await Fee.find().sort( {FeeId: 'desc'} );

        return res.send({ status: 1, results: fees });

    } catch(error) {

        return res.send({ status: 0, message: error.message });

    }
};

module.exports.creatFee = async (req, res) => {

    try {
        const { Weigh, Kind, Distance, Service, Value, Type, EstimateTime } = req.body;

        const fee = await Fee.create({ Weigh, Kind, Distance, Service, Value, Type, EstimateTime });

        return res.send({ status: 1, results: fee });

    } catch(error) {

        return res.send({ status: 0, message: error.message });

    }
};

module.exports.updateFee = async (req, res) => {

    try {

        const FeeId = req.params.FeeId;

        const { Weigh, Kind, Distance, Service, Value, Type, EstimateTime } = req.body;

        // Active to inform agency will be stop active or not

        const fee = await Fee.findOneAndUpdate({ FeeId }, { Weigh, Kind, Distance, Service, Value, Type, EstimateTime });

        return res.send({ status: 1, results: fee });

    } catch(error) {

        return res.send({ status: 0, message: error.message });

    }
};

module.exports.deleteFee = async (req, res) => {

    try {

        const FeeId = req.params.FeeId;

        const fee = await Fee.findOneAndRemove({ FeeId });

        return res.send({ status: 1, message: 'deleted successfully' });

    } catch(error) {

        return res.send({ status: 0, message: error.message });

    }
};



