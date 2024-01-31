const mongoose = require('mongoose')
const { Schema } = mongoose;
const registerCourseSchema = mongoose.Schema({
    fullName:{
        type : String,
        required: true
    },
    phoneNumber:{
        type: String,
        required: true
    },
    dateRegister:{
        type: Date,
        default: Date.now()
    },
    course:{
        type: Schema.Types.ObjectId,
        ref:'Course',
    }
});
const RegisterCourse = mongoose.model('registerCourse',registerCourseSchema)
module.exports = RegisterCourse;