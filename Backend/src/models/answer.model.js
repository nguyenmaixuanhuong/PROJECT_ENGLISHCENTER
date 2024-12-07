const mongoose = require('mongoose');
const { Schema } = mongoose;

const answerSchema = mongoose.Schema({
    questionId: {
        type: Schema.Types.ObjectId,
        ref: 'Question',
    },
    studentId: {
        type: Schema.Types.ObjectId,
        ref: 'Student',
    },
    examId: {
        type: Schema.Types.ObjectId,
        ref: 'Exam',
    },
    partId: {
        type: Schema.Types.ObjectId,
        ref: 'Part',
    },
    answer: {
        type: String,
    },
    isCorrect: {
        type: Boolean,
    },
    finalScore: {
        type: Number
    },
    comments: {
        type: Object
    },
    submittedAt: {
        type: Date,
        default: Date.now(),
    },
    attempt: {
        type: Number,  // thêm trường này để lưu số lần làm bài
        required: true,
        default: 1
    }
})

const Answer = mongoose.model('Answer', answerSchema);
module.exports = Answer;