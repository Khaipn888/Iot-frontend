const express = require('express');
const router = express.Router();

const roomController = require('../controllers/roomController');
const auth = require('../middleware/authMiddleware');
const room = require('../middleware/roomMiddleware');

//create room
router.post('/api/v1/room/create', auth, roomController.createRoom);

//get all rooms user have
router.get('/api/v1/room/get-all', auth, roomController.getAll);

//detail room and lamps, windows inside
router.post('/api/v1/room/detail', auth, room, roomController.detail);

//update
router.put('/api/v1/room/update', auth, room, roomController.update);

//delte
router.post('/api/v1/room/delete', auth, room, roomController.delete);

module.exports = router;
