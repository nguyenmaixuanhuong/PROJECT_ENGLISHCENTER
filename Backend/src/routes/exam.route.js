const express = require('express');
const router = express.Router();
const examController = require('../controllers/exam.controller')

router.post('/create', examController.createExam)
router.get('/getAll', examController.getAllExam)
router.delete('/delete', examController.deleteExam)
router.put('/update', examController.updateExam)
router.get('/getExamsByClass', examController.getExamsByClass)
router.get('/getExamById', examController.getExamById)
router.get('/getExamsPublic', examController.getExamPublic)
router.put('/isPublishScore', examController.turnOnPublishScore)
module.exports = router;