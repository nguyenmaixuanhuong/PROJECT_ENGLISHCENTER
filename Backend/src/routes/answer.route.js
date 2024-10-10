const express = require('express');
const router = express.Router();
const answerController = require('../controllers/answer.controller')

router.post('/submit', answerController.submitAnswer)
router.get('/isSubmitted', answerController.isSubmitted)
router.get('/resultExam', answerController.handleGetUserResults)
router.get('/allSubmission', answerController.getAllSubmisstions)
router.put('/updateScore', answerController.updateFinalScore)
router.post('/suggest', answerController.SuggestScores)
router.post('/submitResultGuest', answerController.handleGuestSubmit)
module.exports = router