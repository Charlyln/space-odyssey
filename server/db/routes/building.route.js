const express = require('express');
const router = express.Router();

const buildingController = require('../controllers/building.controller.js');

router.put('/v1/buildings/:id', buildingController.update_building);

module.exports = router;
