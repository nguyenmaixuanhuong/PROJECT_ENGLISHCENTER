const mongoose = require('mongoose');
const {Schema} = mongoose;

const classSchema = mongoose.Schema({
    className:{
        type: String,
        required: true,
    },
    teachers:[{
        type: Schema.Types.ObjectId,
        ref: 'Teacher',
    }],
    course:{
        type: Schema.Types.ObjectId,
        ref: 'Course',
    },
    startDay:{
        type: String,
        required: true
    },
    finishDay:{
        type: String,
        required: true
    },
    students:[
        {
            type: Schema.Types.ObjectId,
            ref: 'Student',
        }
    ],
    informations:[{
        type: Schema.Types.ObjectId,
        ref: 'Information',
    }],
    attendances:[{
        type: Schema.Types.ObjectId,
        ref: 'Attendance',
    }],
    isFinish:{
        type: Boolean,
        default: false,
    }
});

const Class = mongoose.model('Class',classSchema);
module.exports = Class;