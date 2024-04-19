const express = require('express');
const router = express.Router();
const AssignmentsController = require('../controllers/assignments.controller')

router.post('/create',AssignmentsController.createAssignment);
router.get('/listall',AssignmentsController.listAssignments);
router.get('/listwithteacher',AssignmentsController.listAssignmentsWithTeacher);
router.get('/getassignment',AssignmentsController.getAssignment);
router.get('/unsubmit',AssignmentsController.unSubmitAssignment);
router.post('/submit',AssignmentsController.submitAssignment);
router.post('/markscore',AssignmentsController.markScore);

module.exports = router