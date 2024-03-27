const Room = require('../models/rooms.model')

exports.listRoom = async(req,res)=>{
    try {
        const listRoom = await Room.find({})
        res.status(200).send(listRoom);
        
    } catch (error) {
        res.status(500).send(error);       
    }
}