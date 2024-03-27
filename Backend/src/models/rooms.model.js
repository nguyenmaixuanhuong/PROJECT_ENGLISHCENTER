const mongoose = require('mongoose');

const RoomSchema = mongoose.Schema({
    name:{
        type: String,
        required: true,
    }
})

const Room = mongoose.model('Room', RoomSchema)
module.exports = Room