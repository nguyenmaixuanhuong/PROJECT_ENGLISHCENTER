const Course = require('../models/course.model');
const RegisterCourse = require('../models/registerCourse.model');
const validator = require('validator');
const Level = require('../models/level.model');
exports.createCourse = async (req, res, next) => {
    try {
        const newCourse = new Course(req.body);
        await newCourse.save();
        res.status(200).send({ newCourse })
    } catch (error) {
        res.status(400).send(error);
    }
};
exports.listCourse = async (req, res, next) => {
    try {  
        const courses = await Course.find({});
        res.status(200).send(courses);
    } catch (error) {
        res.status(500).send('Server error', error);
    }
};
exports.updateCourse = async (req, res, next) => {
    const course_id = req.query.id;
    const course_content = req.body
    const course = await Course.findOneAndUpdate(
        { _id: course_id },
        { $set: course_content },
        {
            upsert: true,
            new: true,
        },
    )
        .then(() => res.status(200).send(course))
        .catch(error => { res.status(500).send('Error updating course', error); })
};

exports.deleteCourse = async (req, res, next) => {
    try {
        const course_id = req.query.id;
        const course = await Course.findOneAndUpdate(
            { _id: course_id },
            { isDeleted: true },
            {
                upsert: true,
                new: true,
            },)
        res.status(200).send("Course deleted",course)
    } catch (error) {
        res.status(500).send('Error server delete course', error);
    }

}

exports.registerCourse = async (req, res, next) => {
    const registerCourse = req.body
    try {
        if (!(registerCourse.fullName && registerCourse.phoneNumber && registerCourse.course)) {
            res.status(404).send('Vui lòng nhập đầy đủ thông tin');
        }
        else if (!validator.isMobilePhone(registerCourse.phoneNumber, 'vi-VN')) {
            res.status(404).send('Số điện thoại không chính xác');
        }
        else {
            const newregisterCourse = new RegisterCourse(registerCourse)
            await newregisterCourse.save();
            res.status(200).send('Bạn đã đăng kí tư vấn khóa học thành công');
        }
    } catch (error) {
        res.status(500).send('Server error: ' + error);
    }
}

