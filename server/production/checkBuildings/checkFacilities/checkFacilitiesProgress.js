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

      if (percent >= 100) {
        const newLevel = building.level + 1;
        const multiplier = newLevel * newLevel
        await updateBuilding(
          {
            progress: 0,
            status: facilitiesStatus.production,
            level: newLevel,
            duration: building.duration * multiplier,
            output: building.output * multiplier,
          },
          building.id,
        );
        const costs = user.Costs.filter((cost) => cost.craft === building.name);
        await increaseCosts(costs);
        const message = `${building.name} upgraded to level ${building.level + 1}`;
        await sendInfo(user.id, 'success', message, 'building');
      } else {
        await updateBuilding({ progress: percent }, building.id);
      }
    }
  } catch (error) {
    logger.error('checkFacilitiesProgress', error);
  }
}

module.exports = {
  checkFacilitiesProgress,
};
