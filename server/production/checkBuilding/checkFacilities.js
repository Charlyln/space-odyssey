const { Building } = require('../../db/models/building.model');
const { sendInfo } = require('../../helper/userhelper');
const { checkAvailableRessources, updateBuilding } = require('../../helper/ressourcehelper');
const logger = require('../../logger');

async function checkFacilities(user) {
  try {
    const userData = user;

    await Promise.all(
      userData.Buildings.map(async (building) => {
        if (building.upgrading) {
          if (building.progress === 0) {
            const { enoughtRessources, ressources } = await checkAvailableRessources(building, user.id);

            if (!enoughtRessources) {
              if (!building.waiting) {
                await updateBuilding({ waiting: true }, building.id);

                const message = `Wait for ressources until build ${building.name} !`;
                await sendInfo(user.id, 'warning', message);
              } else {
                // wait until ressources
              }
            } else {
              await Promise.all(
                ressources.map(async (ressource) => {
                  await updateRessource({ value: ressource.ressource.value - ressource.cost }, ressource.ressource.id);
                }),
              );

              const newProgress = building.progress + 10;

              await updateBuilding({ progress: newProgress }, building.id);

              const message = `${building.name} start building`;
              await sendInfo(user.id, 'info', message);
            }
          } else if (building.progress > 0) {
            const newProgress = building.progress + 10;
            const updateProgress = newProgress >= 100 ? 100 : newProgress;

            if (newProgress < 110) {
              await updateBuilding({ progress: updateProgress }, building.id);
            } else {
              await updateBuilding({ progress: 0, upgrading: false, level: building.level + 1 }, building.id);

              const message = `${building.name} upgraded to level ${building.level} !`;
              await sendInfo(user.id, 'success', message);
            }
          }
        }
      }),
    );
  } catch (error) {
    logger.error('checkFacilities');
  }
}

module.exports = {
  checkFacilities,
};
