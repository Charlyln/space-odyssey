const { Building } = require('../../db/models/building.model');
const { sendInfo } = require('../../helper/userhelper');
const { checkAvailableRessources, updateBuilding } = require('../../helper/ressourcehelper');

async function checkFacilities(user) {
  try {
    const userData = user;

    await Promise.all(
      userData.Buildings.map(async (building) => {
        if (building.upgrading) {
          if (building.progress === 0) {
            await checkAvailableRessources(building, user.id);
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
  } catch (error) {}
}

module.exports = {
  checkFacilities,
};
