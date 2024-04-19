const mongoose = require('mongoose');
const { Schema } = mongoose;
const bcrypt = require('bcrypt');
const AccountSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    avatar: {
        name: {
            type: String,
        },
        publicId:{
            type: String,

        },
        url:{
            type: String,          
        }

    },
    role: {
        type: String,
        required: true,
    },
    isActive: {
        type: Boolean,
        default: true
    },
    notifications:[{
        information:{
            type: Schema.Types.ObjectId,
            ref:'Information',
        },
        action: {
            type: String,
        },
        role: {
            type: String,
            enum: ['Teacher', 'Student']
        },
        user: {
            type: Schema.Types.ObjectId,
            refPath: 'notifications.role'
        },
        isChecked:{
            type: Boolean,
            default: false,
        },
        time:{
            type: Date,
            default: new Date()
        }
    }]
})

AccountSchema.pre('save', async function (next) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
})
const Account = mongoose.model('Account', AccountSchema)
module.exports = Account;