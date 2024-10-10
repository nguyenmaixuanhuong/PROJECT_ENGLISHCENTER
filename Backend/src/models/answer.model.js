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
    submittedAt: {
        type: Date,
        default: Date.now(),
    }
})

const Answer = mongoose.model('Answer', answerSchema);
module.exports = Answer;