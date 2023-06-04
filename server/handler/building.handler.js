const logger = require('../logger');

const { Building } = require('../db/models/building.model');
const { facilitiesStatus } = require('enums/status');

async function handleUpgradeBuilding(action) {
  try {
    const parameters = action.parameters;

    const building = await Building.findOne({
      where: { id: parameters.buildingId },
    });

    await building.update({ status: facilitiesStatus.setup });
    return building;
  } catch (error) {
    logger.error('UpgradeBuilding', error);
  }
}

async function handleCancelBuilding(action) {
  try {
    const parameters = action.parameters;

    const building = await Building.findOne({
      where: { id: parameters.buildingId },
    });

    if (building.waiting) {
      building.update({ waiting: false, upgrading: false });
    }

    return building;
  } catch (error) {
    logger.error('CancelBuilding');
  }
}

module.exports = {
  handleUpgradeBuilding,
  handleCancelBuilding,
};
