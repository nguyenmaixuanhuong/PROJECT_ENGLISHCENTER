const config = require('../config');
const Student = require('../models/student.model')
const Course = require('../models/course.model')
const Account = require('../models/account.model')
const validator = require('validator');
const { generateCode } = require('../Service/index.service');
exports.createAccountStudent = async (req, res, next) => {
   try {
      const inforStudent = req.body.student;
      if ((inforStudent.fullName && inforStudent.birthDay && inforStudent.phoneNumber && inforStudent.address)) {
         if (validator.isMobilePhone(inforStudent.phoneNumber, 'vi-VN')) {
            const studentCode = generateCode(6);
            const username = `HS${studentCode}`
            const password = inforStudent.phoneNumber;
            const AccountStudent = await new Account({
               username,
               password,
               role: 'Student'
            })
            const newStudent = await new Student(inforStudent)
            newStudent.account = AccountStudent._id;
            await newStudent.save();
            await AccountStudent.save();
            res.status(200).send(newStudent);
         }
         else {
            res.status(403).send("Số điện thoại không chính xác")
         }
      }
      else {
         res.status(403).send("Vui lòng nhập đầy đủ thông tin")
      }
   } catch (error) {
      res.status(500).send("Create new student failed: " + error.message)
   }
};

exports.listStudent = async (req, res) => {
   try {
      const listStudent = await Student.find().populate(['class', 'account'])
      res.status(200).send(listStudent)
   } catch (error) {
      res.status(500).send("Error" + error);
   }
};

exports.getStudent = async (req, res) => {
   try {
      const student_id = req.query.id
      const student = await Student.findById({ _id: student_id }).populate(['class', 'account'])
      res.status(200).send(student)
   } catch (error) {
      res.status(500).send("Error" + error);
   }
};

exports.updateStudent = async (req, res) => {
   try {
      const student_id = req.body.id
      const inforUpdate = req.body.infor
      const studentUpdated = await Student.findByIdAndUpdate({ _id: student_id },
         { $set: inforUpdate },
         { $unset: false }
      )
      res.status(200).send(studentUpdated)
   } catch (error) {
      res.status(500).send("Error" + error);
   }
};