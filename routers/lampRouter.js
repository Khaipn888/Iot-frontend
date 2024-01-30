const express = require('express');
const router = express.Router();

const lampController = require('../controllers/lampController');
const auth = require('../middleware/authMiddleware');
const room = require('../middleware/roomMiddleware');
const lamp = require('../middleware/lampMiddleware');

//create lamp
router.post('/api/v1/lamp/create', auth, room, lampController.create);

//change name
router.post('/api/v1/lamp/change-name', auth, lamp, lampController.changeName);

//control manual
router.post('/api/v1/lamp/control-manual', auth, lamp, lampController.controlManual);

//change mode
router.post('/api/v1/lamp/change-mode', auth, lamp, lampController.changeMode);

//change auto-mode break point
router.post('/api/v1/lamp/change-breakpoint', auth, lamp, lampController.changeAutoModeBreakpoint);

//change timer
router.post('/api/v1/lamp/change-timers', auth, lamp, lampController.changeTimers);

//delete lamp
router.post('/api/v1/lamp/delete', auth, lamp, lampController.delete);

module.exports = router;
