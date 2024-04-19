const e = require('cors');
const Assignments = require('../models/assignments.model')
const Class = require('../models/class.model')

exports.createAssignment = async (req, res) => {
    const assignment = req.body
    try {
        const newAssignment = await new Assignments(assignment);
        await newAssignment.save();
        const classCurrent = await Class.findById(assignment.class);
        if (classCurrent) {
            classCurrent.assignments.push(newAssignment._id);
            await classCurrent.save();
            res.status(200).send(newAssignment);
        }
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
}

exports.listAssignmentsWithTeacher = async (req, res) => {
    const idclass = req.query.class;
    const idteacher = req.query.teacher;
    try {
        const listAssignments = await Assignments.find({ $and: [{ class: idclass }, { teacher: idteacher }] }).populate('teacher')
        if (listAssignments) {
            res.status(200).send(listAssignments)
        }
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
}

exports.listAssignments = async (req, res) => {
    const idclass = req.query.class;
    try {
        const listAssignments = await Assignments.find({ class: idclass }).populate('teacher')
        if (listAssignments) {
            res.status(200).send(listAssignments)
        }
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
}

exports.getAssignment = async (req, res) => {
    const id = req.query.id;
    try {
        const assignment = await Assignments.findById(id).populate('teacher')
            .populate({
                path: 'submmits.student',
            })
        res.status(200).send(assignment);
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
}

exports.submitAssignment = async (req, res) => {
    const id = req.body.id
    const submit = req.body.assignment
    try {
        const assignment = await Assignments.findById(id)
        assignment.submmits.push(submit);
        await assignment.save();
        res.status(200).send('Success');
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
}

exports.unSubmitAssignment = async (req, res) => {
    const id = req.query.id
    const student = req.query.student
    try {
        const result = await Assignments.findByIdAndUpdate(
            { _id: id },
            { $pull: { submmits: { student: student } } },
            { new: true }
        );
        res.status(200).send('Success');
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }

}

exports.markScore = async (req, res) => {
    const id = req.body.id
    const student = req.body.student
    const score = req.body.score
    try {
        const result = await Assignments.findOneAndUpdate(
            {
                _id: id,
                "submmits.student": student
            },
            {
                $set: { "submmits.$.score": score }
            },
            {
                new: true
            }
        );
        if (result) {
            res.status(200).send('Thành công');
        }
        else{
        res.status(400).send('Không tìm thấy');

        }
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
}