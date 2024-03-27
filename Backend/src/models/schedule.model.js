const mongoose = require('mongoose');
const { Schema } = mongoose;

const ScheduleShema = mongoose.Schema({
    title:{
        type: String,
    },
    teacher: {
        type: Schema.Types.ObjectId,
        ref:'Teacher'
    },
    startDate:{
        type: Date,
        required: true
    },
    endDate:{
        type: Date,
        required: true
    },
    class:{
        type: Schema.Types.ObjectId,
        ref:'Class'
    },
    room:{
        type: Schema.Types.ObjectId,
        ref:'Room'
    }

})

const Schedule = mongoose.model('Schedule', ScheduleShema)
module.exports = Schedule