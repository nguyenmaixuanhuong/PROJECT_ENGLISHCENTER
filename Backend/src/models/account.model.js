const mongoose = require('mongoose');
const { Schema } = mongoose;

const AccountSchema = mongoose.Schema({
    username:{
        type: String,
        required: true,
    },
    password:{
        type: String,
        required: true,
    },
    avartar:{
        type: String,
    },
    role:{
        type: String,
        required: true,
    },
    isActive:{
        type: Boolean,
        default: true
    }
})

const Account  = mongoose.model('Account',AccountSchema)
module.exports = Account;