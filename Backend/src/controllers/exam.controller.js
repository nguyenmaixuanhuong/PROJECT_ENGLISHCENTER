const Course = require('../models/course.model');
const Class = require('../models/class.model');
const validator = require('validator');
const Question = require('../models/questions.model')
const Part = require('../models/part.model');
const Exam = require('../models/exam.model')
const Student = require('../models/student.model')
exports.createExam = async (req, res) => {
    try {
        const exam = req.body.exam;
        const userId = req.body.id;
        const parts = exam.part;

        const newParts = await Promise.all(parts.map(async (part) => {
            // Save questions in to database
            const newQuestions = await Promise.all(part.questions.map(async (question) => {

                const newQuestion = new Question(question);
                const result = await newQuestion.save().catch((err) => {
                    throw err;
                });
                return result._id;
            }));

            // Save part in to database
            const partInfor = { ...part, questions: newQuestions };
            const newPart = new Part(partInfor);
            const result = await newPart.save().catch((err) => {
                throw err;
            });
            return result._id;
        }));
        const examInfor = { userCreated: userId, summary: exam.summary, part: newParts }
        const newExam = new Exam(examInfor);
        await newExam.save().then(async (result) => {
            if (!result.summary.scope.isPublic) {
                const classes = result.summary.scope.classes
                for (const classId of classes) {
                    const classItem = await Class.findById(classId);
                    classItem.exams.push(result._id);
                    await classItem.save();
                }
            }
        });

        res.status(200).send('Created successfully');

    } catch (error) {
        console.log(error);

        res.status(500).send(error);
    }
};

exports.getExamById = async (req, res) => {
    try {

        const examId = req.query.examId;
        const exam = await Exam.findById(examId)
            .populate('userCreated')
            .populate('summary.scope.classes')
            .populate({
                path: 'part',
                populate: {
                    path: 'questions',
                },
            });
        if (exam) {
            res.status(200).send(exam);
        }
        else {
            res.status(404).send('Not Found');
        }
    } catch (error) {
        console.log(error);
        res.status(500).send('Error Server')

    }
}

exports.getAllExam = async (req, res) => {
    try {
        const userId = req.query.userId;
        const exams = await Exam.find({ userCreated: userId })
            .populate('summary.scope.classes')
            .populate({
                path: 'part',
                populate: {
                    path: 'questions',
                },
            });
        res.status(200).send(exams);
    } catch (error) {
        res.status(400).send(error);
    }
};

exports.getExamPublic = async (req, res) => {
    try {
        const exams = await Exam.find({ "summary.scope.isPublic": true })
            .populate({
                path: 'part',
                populate: {
                    path: 'questions',
                },
            });
        res.status(200).send(exams);
    } catch (error) {
        res.status(500).send(error);
    }
};


exports.getExamsByClass = async (req, res) => {
    try {
        const studentId = req.query.studentId;
        const student = await Student.findById(studentId);
        if (student) {
            const classes = student.class;
            const exams = await classes.reduce(async (accPromise, cls) => {
                const acc = await accPromise; // Wait for the accumulated exams so far
                const classItem = await Class.findById(cls).populate('exams');

                if (classItem.exams.length > 0) {
                    acc.push(...classItem.exams); // Spread the exams into the accumulator array
                }

                return acc; // Return the updated accumulator
            }, Promise.resolve([]));

            res.status(200).send(exams);
        }
        else {
            res.status(404).send('Not Found')
        }

    } catch (error) {
        console.log(error);
        res.status(500).send('Error Server')

    }
}
exports.deleteExam = async (req, res) => {
    try {
        const examId = req.query.examId;
        await Exam.findByIdAndDelete(examId);
        res.status(200).send('Delete successfully');
    } catch (error) {
        res.status(500).send('Error Server');
    }
}




exports.updateExam = async (req, res) => {
    try {
        const exam = req.body.exam;
        // Bước 1: Lấy Exam hiện tại từ database
        const existingExam = await Exam.findById(exam.id).populate('part');

        if (!existingExam) {
            throw new Error('Exam not found');
        }

        // Bước 2: Cập nhật thông tin tổng quát của Exam
        existingExam.summary = exam.summary;

        // Bước 3: Duyệt qua các part đã có trong Exam cũ và cập nhật chúng
        const updatedPartIds = [];
        for (const updatedPart of exam.part) {
            if (updatedPart._id) {
                // Part đã tồn tại, cần cập nhật
                const existingPart = await Part.findById(updatedPart._id);

                if (existingPart) {
                    existingPart.title = updatedPart.title;
                    existingPart.number = updatedPart.number;
                    existingPart.type = updatedPart.type;
                    // Cập nhật hoặc thêm mới các question trong Part này
                    const updatedQuestionIds = [];
                    for (const updatedQuestion of updatedPart.questions) {
                        if (updatedQuestion._id) {
                            // Cập nhật Question đã tồn tại
                            await Question.findByIdAndUpdate(updatedQuestion._id, updatedQuestion);
                            updatedQuestionIds.push(updatedQuestion._id);
                        } else {
                            // Thêm mới Question
                            const newQuestion = new Question(updatedQuestion);
                            await newQuestion.save();
                            updatedQuestionIds.push(newQuestion._id);
                        }
                    }
                    existingPart.questions = updatedQuestionIds;
                    await existingPart.save();
                    updatedPartIds.push(existingPart._id);
                }
            } else {
                // Thêm mới Part
                const newQuestionIds = [];
                for (const updatedQuestion of updatedPart.questions) {
                    const newQuestion = new Question(updatedQuestion);
                    await newQuestion.save();
                    newQuestionIds.push(newQuestion._id);
                }
                const updateNewPart = {
                    ...updatedPart,
                    questions: newQuestionIds
                }
                const newPart = new Part(updateNewPart);
                await newPart.save();
                updatedPartIds.push(newPart._id);
            }
        }

        // Bước 4: Xóa các part đã bị loại bỏ khỏi Exam

        const partsToRemove = existingExam.part.filter(part =>
            !updatedPartIds.some(updatedPartId => updatedPartId.equals(part._id))
        );
        if (partsToRemove.length > 0) {
            await Part.deleteMany({ _id: { $in: partsToRemove } });
        }

        // Bước 5: Cập nhật Exam với các part mới và đã được cập nhật
        existingExam.part = updatedPartIds;
        await existingExam.save();
        res.status(200).send(existingExam);
    } catch (error) {
        console.log(error);
        res.status(500).send(error);

    }
}

exports.turnOnPublishScore = async (req, res) => {
    try {
        const { examId } = req.body;

        const updatExam = await Exam.findByIdAndUpdate(examId, {
            isPublicScore: true
        });

        res.status(200).send(updatExam);
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
}