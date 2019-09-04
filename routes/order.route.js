const router = require('express').Router();

const orderController = require('../controllers/order.controller');

router.get('/getAllOrderByStatus', orderController.getAllOrderByStatus);

router.get('/getAllOrderByService', orderController.getAllOrderByService);

router.get('/getAllOrderByDate', orderController.getAllOrderByDate);

router.get('/getAllOrderByAgency', orderController.getAllOrderByAgency);

router.get('/getAllOrderByShipper', orderController.getAllOrderByShipper);

router.get('/getAllOrderByAllCondition', orderController.getAllOrderByAllCondition);

router.get('/getOrderInfoById', orderController.getOrderInfoById);

router.post('/creatOrder', orderController.creatOrder);

router.put('/updateOrderById', orderController.updateOrderById);

router.delete('/deleteOrderById', orderController.deleteOrderByIdAndStatus);

module.exports = router;