const express = require('express');
const router = express.Router();
const classController = require('../controllers/class.controller');

router.post('/create',classController.createClass)
router.put('/update',classController.updateClass)
router.post('/addstudent',classController.addStudentInClass)
router.post('/addteacher',classController.addTeachersInClass)
router.get('/listclass',classController.listClass)
router.get('/finished',classController.finishedClass)
router.get('/getclass',classController.getClass)
router.get('/getClassesById',classController.getClassesById)
module.exports = router;