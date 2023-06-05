const express = require('express');
const router = express.Router();

const actionController = require('../controllers/action.controller');

router.post('/v1/actions', actionController.handle_action);

module.exports = router;
