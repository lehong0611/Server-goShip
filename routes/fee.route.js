const router = require('express').Router();
const authen = require('../middlewares/authen');

const feeController = require('../controllers/fee.controller');

router.get('/fees', authen.isAuthorized, feeController.getAllFees);

router.post('/createFee', authen.isAuthorized, feeController.creatFee);

router.put('/updateFee/:FeeId', authen.isAuthorized, feeController.updateFee);

router.delete('/deleteFee/:FeeId', authen.isAuthorized, feeController.deleteFee);

module.exports = router;