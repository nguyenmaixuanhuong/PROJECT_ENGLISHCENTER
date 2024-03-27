const Class = require('../models/class.model')
const Course = require('../models/course.model')
const Student = require('../models/student.model')
const Teacher = require('../models/teacher.model')

exports.createClass = async (req, res, next) => {
    const inforClass = req.body
    if ((inforClass.className && inforClass.course)) {
        const newClass = await new Class(inforClass)
        await newClass.save()
            // await teacher.save()
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

exports.addTeachersInClass = async (req, res) => {
    const class_id = req.body.id
    const teachers = req.body.teachers
    const currentClass = await Class.findById(class_id)
    try {
        for (const teacher of teachers) {
            if (!currentClass.teachers.includes(teacher.value)) {
                currentClass.teachers.push(teacher.value)
                await currentClass.save()


                const teacherCurrent = await Teacher.findById(teacher.value)
                teacherCurrent.class.push(class_id)
                await teacherCurrent.save()
                
            }
        }
        res.status(200).send('Thêm học viên thành công')
    } catch (error) {
        console.log(error);
        res.status(500).send(error)
    }

}

exports.addStudentInClass = async (req, res) => {
    const class_id = req.body.id
    const students = req.body.students
    const currentClass = await Class.findById(class_id)
    try {
        for (const student of students) {
            if (!currentClass.students.includes(student.value)) {
                currentClass.students.push(student.value)
                await currentClass.save()


                const studentCurrent = await Student.findById(student.value)
                studentCurrent.class.push(class_id)
                await studentCurrent.save()              
            }
        }
        res.status(200).send('Thêm học viên thành công')
    } catch (error) {
        console.log(error);
        res.status(500).send(error)
    }

}

exports.listClass = async (req, res) => {
    try {
        if (req.query.teacher) {
            const listClass = await Class.find({ teacher: req.query.teacher }).populate(['course', 'teachers'])
            res.status(200).send(listClass)
        }
        else if (req.query.course) {
            const listClass = await Class.find({ course: req.query.course }).populate(['course', 'teachers'])
            res.status(200).send(listClass)
        }
        else {
            const listClass = await Class.find({}).populate(['course', 'teachers'])
            res.status(200).send(listClass)
        }
    } catch (error) {
        console.log(error);
        res.status(500).send(error.message)
    }
};

exports.finishedClass = async (req, res) => {
    try {
        const id = req.query.id
        const classFinished = await Class.findOneAndUpdate(
            { _id: id },
            { isFinish: true },
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

exports.getClass = async (req, res) => {
    const id = req.query.id;
    try {
        const classCurrent = await Class.findById(id)
        .populate('course')
        .populate({
            path: 'teachers',
            populate: {
                path: 'account',
                select: 'avatar'
            }
        })
        .populate({
            path: 'students',
            populate: {
                path: 'account',
                select: '-password'
            }
        });
        res.status(200).send(classCurrent)
    } catch (error) {
        console.log(error);
        res.status(500).send(error.message)        
    }
};

exports.getClassesById = async (req, res) => {
    const id = req.query.id;
    const role = req.query.role;
    // console.log(id,role);
    try {
        let classes;
        if(role==='Student'){
            classes = await Class.find({students: id})
            
        }
        else if(role==='Teacher'){
            classes = await Class.find({teachers: id})
        }
        res.status(200).send(classes)
        
    } catch (error) {
        res.status(500).send(error.message)
    }
} 