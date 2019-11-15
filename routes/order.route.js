const router = require('express').Router();
const authen = require('../middlewares/authen');

const orderController = require('../controllers/order.controller');

router.get('/getAllOrderByStatus', authen.isAuthorized, orderController.getAllOrderByStatus);

router.get('/getOrderForAgency', authen.isAuthorized, orderController.getOrderforAgency);

router.get('/getSuccessOrFailGet', authen.isAuthorized, orderController.getSuccessOrFailGet);

router.get('/getSuccessOrFailTrans', authen.isAuthorized, orderController.getSuccessOrFailTrans);

router.get('/getOrderByShipperGet', authen.isAuthorized, orderController.getOrderByShipperGet);

router.get('/getOrderByShipperTrans', authen.isAuthorized, orderController.getOrderByShipperTrans);

router.get('/getOrderInfoById/:_id', orderController.getOrderInfoById);

router.post('/createOrder', authen.isAuthorized, orderController.createOrder);

router.put('/updateOrderById/:OrderId', authen.isAuthorized, orderController.updateOrderById);

router.delete('/deleteOrderById/:OrderId', authen.isAuthorized, orderController.deleteOrderById);

router.post('/report', authen.isAuthorized, orderController.report);

router.post('/detailOrder', authen.isAuthorized, orderController.detailOrder);

module.exports = router;