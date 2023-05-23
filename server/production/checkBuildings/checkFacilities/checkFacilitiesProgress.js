const { sendInfo } = require('../../../helper/model.helper');
const { updateBuilding, increaseCosts } = require('../../../helper/model.helper');
const logger = require('../../../logger');

const buildingSpeed = 40;

async function checkFacilitiesProgress(user, checkDate) {
  logger.info('      Check Progress');
  try {
    const userData = user;

    const upgradingBuildings = userData.Buildings.filter((building) => building.upgrading);
    upgradingBuildings.sort((a, b) => new Date(a.updatedAt) - new Date(b.updatedAt));

    if (upgradingBuildings.length > 0) {
      const building = upgradingBuildings[0];
      if (building.upgrading) {
        if (building.progress > 0) {
          const newProgress = building.progress + buildingSpeed;
          const updateProgress = newProgress >= 100 ? 100 : newProgress;

          if (newProgress < 100) {
            await updateBuilding({ progress: updateProgress }, building.id);
          } else {
            await updateBuilding({ progress: 0, upgrading: false, level: building.level + 1 }, building.id);
            const costs = user.Costs.filter((cost) => cost.craft === building.name);
            await increaseCosts(costs);
            const message = `${building.name} upgraded to level ${building.level + 1}`;
            await sendInfo(user.id, 'success', message, 'building');
          }
        }
      }
    }
  } catch (error) {
    logger.error('checkFacilitiesProgress', error);
  }
}

module.exports = {
  checkFacilitiesProgress,
};
