const express = require('express');
const router = express.Router();
const RegisterController = require('../controllers/register.controller')

router.post('/add',RegisterController.addRegister);
router.get('/listregister',RegisterController.listRegister);
router.get('/confirm',RegisterController.confirmContact);

module.exports = router