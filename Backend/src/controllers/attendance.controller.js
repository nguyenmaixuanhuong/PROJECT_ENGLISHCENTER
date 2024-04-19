const Attendance = require('../models/attendance.model')
const Class = require('../models/class.model')
exports.create = async (req, res) => {
    const infor = req.body
    try {
        const attendance = await new Attendance(infor);
        await attendance.save();
        const classCurrent = await Class.findById(infor.class)
        classCurrent.attendances.push(attendance._id);
        await classCurrent.save();
        res.status(200).send(attendance);
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
}

exports.listAttendances = async (req, res) => {
    const id = req.query.id
    try {
        const listAttendances = await Attendance.find({ class: id })
            .populate('teacher', 'fullName')
        res.status(200).send(listAttendances);
    } catch (error) {
        res.status(500).send(error);
    }
}

exports.updateAttendance = async (req, res) => {
    const idAttendance = req.body.id
    const attendees = req.body.attendees
    try {
        const attendanceUpdate = await Attendance.findByIdAndUpdate(
            idAttendance,
            { $set: { 'attendees': attendees } },
            { new: true }
        )
        res.status(200).send(attendanceUpdate);
    } catch (error) {
        res.status(500).send(error);
    }
}