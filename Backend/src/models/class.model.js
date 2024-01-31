const mongoose = require('mongoose');
const {Schema} = mongoose;

const classSchema = mongoose.Schema({
    className:{
        type: String,
        required: true,
    },
    teacher:{
        type: Schema.Types.ObjectId,
        ref: 'Teacher',
    },
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
    isFinish:{
        type: Boolean,
        default: false,
    }
});

const Class = mongoose.model('Class',classSchema);
module.exports = Class;