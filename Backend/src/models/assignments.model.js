const mongoose = require('mongoose');
const { Schema } = mongoose;

const assignmentsSchema = mongoose.Schema({
    class: {
        type: Schema.Types.ObjectId,
        ref: 'Class',
        required: true
    },
    teacher: {
        type: Schema.Types.ObjectId,
        ref: 'Teacher',
        required: true
    },
    title: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: new Date(),
    },
    dueDate: {
        type: Date,
    },
    score: {
        type: Number,
    },
    content: {
        description: String,
        documents: [{
            name: String,
            publicId: String,
            url: String,
        }],
        links: [{
            type: String,
        }],
    },
    submmits: [{
        student: {
            type: Schema.Types.ObjectId,
            ref: 'Student',
        },
        timeSubmitted: {
            type: Date,
            default: new Date(),
        },
        assignments: [{
            name: String,
            publicId: String,
            url: String,
        }],
        score: {
            type: Number,
        },
    }]
})

const Assignments = mongoose.model('assignments', assignmentsSchema);
module.exports = Assignments;