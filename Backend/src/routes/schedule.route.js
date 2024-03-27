const express = require('express');
const router = express.Router();
const ScheduleController = require('../controllers/schedule.controller')

router.post('/create',ScheduleController.createSchedule);
router.get('/getall',ScheduleController.getAllSchedule);
router.post('/update',ScheduleController.updateSchedule)
router.get('/delete',ScheduleController.deleteSchedule)
router.get('/getschedules',ScheduleController.getSchedules)
module.exports = router;