const express = require('express');
const router = express.Router();
const studentController = require('../controllers/student.controller')

router.post('/create',studentController.createAccountStudent)
router.get('/liststudent',studentController.listStudent)
router.get('/getstudent',studentController.getStudent)
router.post('/update',studentController.updateStudent)
module.exports = router; 