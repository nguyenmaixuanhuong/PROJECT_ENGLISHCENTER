const express = require('express');
const router = express.Router();
const courseController = require('../controllers/course.controller')

router.post('/create', courseController.createCourse)
router.put('/update', courseController.updateCourse)
router.delete('/delete', courseController.deleteCourse)
router.post('/register', courseController.registerCourse)
router.get('/listcourse', courseController.listCourse)
module.exports = router