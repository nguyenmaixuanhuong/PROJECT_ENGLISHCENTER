const mongoose = require('mongoose')
const { Schema } = mongoose;
const studentSchema = mongoose.Schema({
    account:{
        type: Schema.Types.ObjectId,
        ref:'Account'
    },
    fullName:{
        type : String,
        required: true
    },
    birthDay:{
        type: String,
        required: true
    },
    phoneNumber:{
        type: String,
        required: true
    },
    address:{
        type: String,
        required: true
    },
    class:[{
        type: Schema.Types.ObjectId,
        ref:'Class'
    }]
});
const Student = mongoose.model('Student',studentSchema)
module.exports = Student;