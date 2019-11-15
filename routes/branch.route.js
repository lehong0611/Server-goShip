const router = require('express').Router();
const authen = require('../middlewares/authen');

const agencyController = require('../controllers/branch.controller');

router.get('/agencys', authen.isAuthorized, agencyController.getAllAgencys);

router.get('/agency', authen.isAuthorized, agencyController.getAgencyInfo);

router.post('/createAgency', authen.isAuthorized, agencyController.creatAgency);

router.put('/updateAgency/:AgencyId', authen.isAuthorized, agencyController.updateAgency);

router.delete('/deleteAgency/:AgencyId', authen.isAuthorized, agencyController.deleteAgency);

router.post('/reportAllAgency', authen.isAuthorized, agencyController.reportAllAgency);

module.exports = router;