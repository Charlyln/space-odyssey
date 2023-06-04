const { facilitiesStatus } = require('enums');
const { sendInfo } = require('../../../helper/model.helper');
const { updateBuilding, increaseCosts } = require('../../../helper/model.helper');
const { getPercentProgress } = require('../../../helper/utils.helper');
const logger = require('../../../logger');

async function checkFacilitiesProgress(user, checkDate) {
  logger.info('      Check Progress');
  try {
    const upgradingBuildings = user.Buildings.filter((building) => building.status === facilitiesStatus.upgrading);

    if (upgradingBuildings.length > 0) {
      const building = upgradingBuildings[0];
      const percent = getPercentProgress(building.startTime, building.duration, checkDate);

      if (percent < 100) {
        await updateBuilding({ progress: percent }, building.id);
      } else if (percent >= 100) {
        await updateBuilding({ status: facilitiesStatus.upgraded, progress: 100 }, building.id);
      }
    }
  } catch (error) {
    logger.error('checkFacilitiesProgress', error);
  }
}

module.exports = {
  checkFacilitiesProgress,
};
