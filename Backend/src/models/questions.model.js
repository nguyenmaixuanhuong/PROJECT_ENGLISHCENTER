const mongoose = require('mongoose');
const { Schema } = mongoose;

const questionSchema = mongoose.Schema({
    questionText: {
        type: String,
    },
    number: {
        type: Number,
    },
    type: {
        type: String,
    },
    audioFile: {
        url: {
            type: String,
        },
        publicId: {
            type: String,
        }
    },
    questionType: {
        type: String,
    },
    choices: [{
        choiceValue: {
            type: String,
        },
        isCorrect: {
            type: Boolean,
        },
        choiceText: {
            type: String,
        }
    }],
    score: {
        type: Number,
    },
    isUpdatedScore: {
        type: Boolean,
    }
})

const question = mongoose.model('Question', questionSchema);
module.exports = question;