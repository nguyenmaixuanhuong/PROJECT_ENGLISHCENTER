const config = require('../config');
const { deactivateAccount, activateAccount } = require('../Service/index.service');
const Student = require('../models/student.model')
const Teacher = require('../models/teacher.model');
const Register = require("../models/register.model");
const Class = require('../models/class.model')
const Course = require('../models/course.model');
exports.loginAdmin = async (req, res, next) => {
   const { username, password } = req.body;
   if (!(username && password)) {
      return res
         .status(401)
         .send({ error: "Nhập đầy đủ tài khoản và mật khẩu" });
   }
   else if (username === config.account_admin.username && password === config.account_admin.password) {
      return res.status(200).json({ success: true });
   }
   else {
      return res.status(404).send('Username or password is incorrect');
   }
};

async function calculateTotalStudentsForCourse(courseId) {
   try {
      const result = await Class.aggregate([
         {
            $match: {
               course: courseId
            }
         },
         {
            $group: {
               _id: null,
               totalStudents: { $sum: { $size: "$students" } } // Tính tổng số học sinh trong tất cả các lớp học
            }
         }
      ]);

      if (result.length > 0) {
         return result[0].totalStudents;
      } else {
         return 0;
      }
   } catch (error) {
      console.error("Error calculating total students for course:", error);
      throw error;
   }
}


exports.overView = async (req, res) => {
   try {
      const numberStudent = await Student.countDocuments();
      const numberTeacher = await Teacher.countDocuments();
      const registers = await Register.find({ isContacted: false });
      const numberRegister = registers.length;
      const numberClass = await Class.countDocuments();
      const dataSet = []
      const courses = await Course.find({})
      for (const element of courses) {
         const sum = await calculateTotalStudentsForCourse(element._id);
         const item = {
            label: element.courseName,
            numberStudent: sum
         }
         dataSet.push(item);
      }

       res.status(200).send({
         numberClass, numberRegister, numberStudent, numberTeacher,dataSet
      })
   } catch (error) {
      res.status(500).send(error);
   }


}


exports.deactivedAccount = async (req, res) => {

   const id = req.query.id;
   const account = deactivateAccount(id);
   if (account) {
      res.status(200).send('Deactivated successfully');
   }
   else {
      res.status(500).send('Deactivated failed');
   }
}

exports.activedAccount = async (req, res) => {

   const id = req.query.id;
   const account = activateAccount(id);
   if (account) {
      res.status(200).send('Activated successfully');
   }
   else {
      res.status(500).send('Activated failed');
   }
}
