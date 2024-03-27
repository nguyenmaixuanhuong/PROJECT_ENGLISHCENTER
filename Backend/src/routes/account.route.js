const express = require('express');
const router = express.Router();
const accountController = require('../controllers/account.controller')
router.post('/changeavatar',accountController.changeAvatar );
router.post('/changepassword',accountController.changePassword)
router.post('/changeinfor',accountController.changeInfor)
module.exports = router;