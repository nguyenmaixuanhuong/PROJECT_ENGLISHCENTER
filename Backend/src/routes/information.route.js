const express = require('express');
const router = express.Router();
const informationController = require('../controllers/information.controller')

router.get('/removefile',informationController.removeFileInCloud);
router.post('/create',informationController.create)
router.get('/getlistinfor',informationController.listInformation);
router.delete('/delete',informationController.deleteInformation)
router.post('/update',informationController.updateInformation)
module.exports = router