const mongoose = require('mongoose');
const {Schema} = mongoose;

const AttendanceShema = mongoose.Schema({
    date: {
        type : Date,
        default: new Date(),
    },
    class:{
        type: Schema.Types.ObjectId,
        ref:'Class'
    },
    teacher:{
        type: Schema.Types.ObjectId,
        ref:'Teacher'
    },
    attendees:[{
        type: Schema.Types.ObjectId,
        ref:'Student'
    }]
})

const Attendance = mongoose.model('Attendance',AttendanceShema);
module.exports = Attendance;