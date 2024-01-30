const express = require('express');

const router = express.Router();

const windowController = require('../controllers/windowController');
const auth = require('../middleware/authMiddleware');
const room = require('../middleware/roomMiddleware');
const window = require('../middleware/windowMiddleware');

//create
router.post('/api/v1/window/create', auth, room, windowController.create);

//change name height
router.post('/api/v1/window/change-name-height', auth, window, windowController.changeNameHeight);

//control manual
router.post('/api/v1/window/control-manual', auth, window, windowController.controlManual);

//change mode
router.post('/api/v1/window/change-mode', auth, window, windowController.changeMode);

//change auto mode breakpoint
router.post(
  '/api/v1/window/change-breakpoint',
  auth,
  window,
  windowController.changeAutoModeBreakpoint,
);

//change timer
router.post('/api/v1/window/change-timers', auth, window, windowController.changeTimers);

//delete window
router.post('/api/v1/window/delete', auth, window, windowController.delete);

module.exports = router;
