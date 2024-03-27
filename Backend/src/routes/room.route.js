const express = require('express');
const router = express.Router();
const RoomController = require('../controllers/room.controller')

router.get('/listroom',RoomController.listRoom);

module.exports = router;