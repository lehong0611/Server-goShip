const router = require('express').Router();

const agencyController = require('../controllers/branch.controller');

router.get('/agencys', agencyController.getAllAgencys);

router.get('/agency', agencyController.getAgencyInfo);

router.post('/createAgency', agencyController.creatAgency);

router.put('/updateAgency', agencyController.updateAgency);

module.exports = router;