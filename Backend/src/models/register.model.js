const mongoose = require('mongoose')
const { Schema } = mongoose;
const registerSchema = mongoose.Schema({
    fullName:{
        type : String,
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
    yearOld:{
        type: String,
        required: true
    },
    course:{
        type: Schema.Types.ObjectId,
        ref:'Course'
    },
    isContacted:{
        type: Boolean,
        default: false  // default
    }
});
const Register = mongoose.model('Register',registerSchema)
module.exports = Register;