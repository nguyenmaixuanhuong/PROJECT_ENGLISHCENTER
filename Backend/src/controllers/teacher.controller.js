const Teacher = require('../models/teacher.model')
const validator = require('validator');
const { generateCode} = require('../Service/index.service');
const Account = require('../models/account.model');
exports.createTeacher = async (req, res, next) => {
    try {
        const inforTeacher = req.body.teacher;
        if ((inforTeacher.fullName && inforTeacher.birthDay && inforTeacher.phoneNumber && inforTeacher.email)) {
            if (!validator.isMobilePhone(inforTeacher.phoneNumber, 'vi-VN')) {
                res.status(403).send("Số điện thoại không chính xác")
            }

            else if (!validator.isEmail(inforTeacher.email)) {
                res.status(403).send("Email không chính xác")
            }
            else {
                const TeacherCode = generateCode(6);
                const username = `GV${TeacherCode}`
                const password = inforTeacher.phoneNumber
                const AccountTeacher = await new Account({
                    username,
                    password,
                    role: 'Teacher'
                })
                const newTeacher = await new Teacher(inforTeacher)
                newTeacher.account = AccountTeacher._id;
                await newTeacher.save();
                await AccountTeacher.save();
                res.status(200).send(newTeacher);
            }
        }
        else {
            res.status(403).send("Vui lòng nhập đầy đủ thông tin")
        }
    } catch (error) {
        res.status(500).send("Create new Teacher failed: " + error.message)
    }
};

exports.teacherList = async (req, res) => {
    try {
        const teacherList = await Teacher.find().populate(['level','account']);
        res.status(200).send(teacherList);
    } catch (error) {
        res.status(500).send("Server error: " + error.message)
    }
}

exports.getTeacher = async (req, res) => {
    try {
        const id = req.query.id;
        const teacher = await Teacher.findById({_id: id}).populate(['level','account']);
        res.status(200).send(teacher);
    } catch (error) {
        res.status(500).send("Server error: " + error.message)
    }
}

exports.teacherListWithLevel = async (req, res) => {
    try {
        const level = req.query.level
        const teacherList = await Teacher.find({ level: level });
        res.status(200).send(teacherList);
    } catch (error) {
        res.status(500).send("Server error: " + error.message)
    }
}

exports.updateTeacher = async (req, res) => {
    try {
       const teacher_id = req.body.id
       const inforUpdate = req.body.infor
       const teacherUpdated = await Teacher.findByIdAndUpdate({ _id: teacher_id },
          { $set: inforUpdate },
          { $unset: false }
       )
       res.status(200).send(teacherUpdated)
    } catch (error) {
       res.status(500).send("Error" + error);
    }
 };