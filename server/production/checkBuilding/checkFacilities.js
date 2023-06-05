const { sendInfo } = require('../../helper/userhelper');
const { checkAvailableRessources, updateBuilding } = require('../../helper/ressourcehelper');
const logger = require('../../logger');

const buildingSpeed = 40;

async function checkFacilities(user) {
  try {
    const userData = user;

    const upgradingBuildings = userData.Buildings.filter((building) => building.upgrading);
    upgradingBuildings.sort((a, b) => new Date(a.updatedAt) - new Date(b.updatedAt));

    if (upgradingBuildings.length > 0) {
      const building = upgradingBuildings[0];
      if (building.upgrading) {
        if (building.progress === 0) {
          const enoughtRessources = await checkAvailableRessources(building, user.id);

          if (!enoughtRessources) {
            if (!building.waiting) {
              await updateBuilding({ waiting: true }, building.id);

              const message = `Wait for ressources until build ${building.name} !`;
              await sendInfo(user.id, 'warning', message);
            } else {
              // wait until ressources
            }
          } else {
            const newProgress = building.progress + buildingSpeed;
            await updateBuilding({ progress: newProgress }, building.id);
            const message = `${building.name} start building`;
            await sendInfo(user.id, 'info', message);
          }
        } else if (building.progress > 0) {
          const newProgress = building.progress + buildingSpeed;
          const updateProgress = newProgress >= 100 ? 100 : newProgress;

          if (newProgress < 110) {
            await updateBuilding({ progress: updateProgress }, building.id);
          } else {
            await updateBuilding({ progress: 0, upgrading: false, level: building.level + 1 }, building.id);

            const message = `${building.name} upgraded to level ${building.level + 1} !`;
            await sendInfo(user.id, 'success', message);
          }
        }
      }
    }
  } catch (error) {
    logger.error('checkFacilities', error);
  }
}

module.exports = {
  checkFacilities,
};
