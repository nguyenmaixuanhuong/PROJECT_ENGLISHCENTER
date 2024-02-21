const Class = require('../models/class.model')
const Course = require('../models/course.model')
const Student = require('../models/student.model')
const Teacher = require('../models/teacher.model')

exports.createClass = async (req, res, next) => {
    const inforClass = req.body
    if ((inforClass.className && inforClass.course)) {
        const newClass = await new Class(inforClass)
        // const teacher = await Teacher.findById(newClass.teacher)
        // teacher.class.push(newClass._id)
        await newClass.save()
        // await teacher.save()2
            .then(() => {
                res.status(200).send(newClass)
            })
            .catch(err => {
                res.status(500).send('Error server', err)
            })
    }
    else {
        res.status(400).send('Vui lòng nhập đầy đủ thông tin');
    }
}

exports.updateClass = async (req, res) => {
    const id = req.body.id
    const updateInfor = req.body.update
    const classUpdate = await Class.findById(id);
    if (classUpdate) {
        if (updateInfor.teacher) {
            const newTeacher = await Teacher.findById(updateInfor.teacher)
            const currentTeacher = await Teacher.findById(classUpdate.teacher)
            currentTeacher.class = currentTeacher.class.filter(class_id => class_id !== id)
            await currentTeacher.save();
            await newTeacher.class.push(classUpdate._id)
        }
        await Class.updateOne(
            { _id: id },
            { $set: updateInfor },
            { $unset: false }
        ).then((data) => {
            res.status(200).send(data);
        })
            .catch((err) => {
                res.status(500).send("Error updating class", err);
            })
    }
    else {
        res.status(404).send('Không tìm thấy lớp học')
    }
};

exports.addStudentInClass = async (req, res) => {
    const class_id = req.query.class
    const newStudent = req.body.student
    const currentClass = await Class.findById(class_id)
    if (currentClass.students.includes(newStudent)) {
        res.status(400).send('Học viên đã có trong lớp học')
    }
    else {

        currentClass.students.push(newStudent)
        await currentClass.save()
            .then(async () => {
                const student = await Student.findById(newStudent)
                student.class.push(class_id)
                await student.save()
                res.status(200).send('Thêm học viên thành công')
            })
            .catch(err => res.status(500).send('Error adding student', err));
    }
}
exports.listClass= async (req, res) => {
    try { 
        if(req.query.teacher){
            const listClass = await Class.find({teacher: req.query.teacher}).populate(['course','teacher'])
             res.status(200).send(listClass)

        }  
        else if(req.query.course) {
            const listClass = await Class.find({course: req.query.course}).populate(['course','teacher'])
            res.status(200).send(listClass)
        }
        else{
          const listClass = await Class.find({}).populate(['course','teacher'])
          res.status(200).send(listClass)
        }
    } catch (error) {
        console.log(error);
        res.status(500).send(error.message)
    }
};

exports.finishedClass = async(req, res) => {
    try {
        const id = req.query.id
        const classFinished = await Class.findOneAndUpdate(
            { _id: id },
            { isFinish: true},
            {
                upsert: false,
                new: true,
            },
        )
        res.status(200).send(classFinished)
    } catch (error) {
        res.status(500).send(error.message)
    }
}