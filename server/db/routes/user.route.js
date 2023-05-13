const express = require('express');
const router = express.Router();

const userController = require('../controllers/user.controller.js');

router.get('/v1/users/:id', userController.get_user);
router.post('/v1/users', userController.create_user);

module.exports = router;
