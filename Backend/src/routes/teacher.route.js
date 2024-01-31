const express = require('express');
const router = express.Router();

const teacherSchema = require('../controllers/teacher.controller')

router.post('/create',teacherSchema.createTeacher);
router.get('/teacherlist',teacherSchema.teacherList);
router.get('/teacherlistwithlevel',teacherSchema.teacherListWithLevel);
module.exports = router;