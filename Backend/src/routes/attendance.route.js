const express = require('express');
const router = express.Router();
const attendanceController = require('../controllers/attendance.controller');

router.post('/create',attendanceController.create);
router.get('/listattendances',attendanceController.listAttendances);
module.exports = router