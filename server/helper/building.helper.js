const logger = require('../logger');

const { Building } = require('../db/models/building.model');
const { facilitiesStatus } = require('enums');

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

function getProducedRessource(time, checkTime, output) {
  try {
    const diff = (checkTime - time) / 1000;
    const produced = (diff / 1000) * output;
    const rounded = Math.round(produced);

    logger.warn('diff', diff);
    logger.warn('output', output);
    logger.warn('produce', produced);
    logger.warn('rounded', Math.round(produced));

    return rounded;
  } catch (error) {
    logger.error('getProducedRessource');
  }
}

module.exports = {
  handleUpgradeBuilding,
  handleCancelBuilding,
  getProducedRessource,
};
