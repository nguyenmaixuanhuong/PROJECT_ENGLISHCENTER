const mongoose = require('mongoose');
const {Schema} = mongoose;

const courseShema = mongoose.Schema({
    image: {
        type: String,
    },
    courseName: {
        type: String,
        required: true
    },
    description:{
        type: String,
    },
    numberSession:{
        type: Number,
        required: true
    },
    fee:{
        type: Number,
        required: true
    },
    category:{
        type: String,
        required: true
    },
    level:{
        type: Schema.Types.ObjectId,
        ref: 'Level'
    },
    isDeleted:{
        type: Boolean,
        default: false
    }
})

const Course = mongoose.model('Course',courseShema);
module.exports = Course;