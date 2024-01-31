const mongoose = require('mongoose');
const { Schema } = mongoose;

const teacherSchema = mongoose.Schema({
    account:{
        type: Schema.Types.ObjectId,
        ref:'Account'
    },
    fullName:{
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
    },
    phoneNumber:{
        type: String,
        required: true,
    },
    birthDay:{
        type: String,
        required: true
    },
    level:{
        type: Schema.Types.ObjectId,
        ref: 'Level'
    },
    class:[{
        type: Schema.Types.ObjectId,
        ref:'Class'
    }]
    
})

const Teacher = mongoose.model('Teacher', teacherSchema);
module.exports = Teacher;