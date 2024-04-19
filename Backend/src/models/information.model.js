const mongoose = require('mongoose');
const { Schema } = mongoose;

const InformationSchema = mongoose.Schema({
    class: {
        type: Schema.Types.ObjectId,
        ref: 'Class',
    },
    teacher: {
        type: Schema.Types.ObjectId,
        ref: 'Teacher',
    },
    note: {
        type: String,
        required: true,
    },
    links: [{
        type: String,
    }],
    documents: [{
        name: String,
        publicId: String,
        url: String,
    }],
    date: {
        type: Date,
        default: new Date(),
    },
    comments: [{
        comment: String,
        userType: {
            type: String,
            enum: ['Teacher', 'Student']
        },
        user: {
            type: Schema.Types.ObjectId,
            refPath: 'comments.userType'
        },
        account: {
            type: Schema.Types.ObjectId,
            ref: 'Account',
        },
        date: {
            type: Date,
            default: new Date(),
        }
    }]
})

const Information = mongoose.model('Information', InformationSchema)
module.exports = Information;