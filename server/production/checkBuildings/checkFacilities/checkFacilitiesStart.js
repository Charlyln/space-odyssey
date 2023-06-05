const { sendInfo } = require('../../../helper/model.helper');
const { checkAvailableRessources, updateBuilding } = require('../../../helper/model.helper');
const logger = require('../../../logger');

const buildingSpeed = 40;

async function checkFacilitiesStart(user, checkDate) {
  logger.info('      Check Start');
  try {
    const upgradingBuildings = user.Buildings.filter((building) => building.upgrading);

    if (upgradingBuildings.length > 0) {
      const building = upgradingBuildings[0];
      if (building.upgrading) {
        if (building.progress === 0) {
          const enoughtRessources = await checkAvailableRessources(building, user.id);

          if (!enoughtRessources) {
            if (!building.waiting) {
              await updateBuilding({ waiting: true, startTime: checkDate }, building.id);
              const message = `Wait for ressources until build ${building.name}`;
              await sendInfo(user.id, 'warning', message, 'building');
            } else {
              // wait until ressources
            }
          } else {
            const newProgress = building.progress + buildingSpeed;
            await updateBuilding({ progress: newProgress }, building.id);
            const message = `${building.name} start building`;
            await sendInfo(user.id, 'info', message, 'building');
          }
        }
      }
    }
  } catch (error) {
    logger.error('checkFacilitiesStart', error);
  }
}

module.exports = {
  checkFacilitiesStart,
};
