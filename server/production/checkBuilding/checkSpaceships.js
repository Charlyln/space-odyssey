const logger = require('../../logger');
const { sendInfo } = require('../../helper/userhelper');
const { updateRessource, checkAvailableRessources, updateState } = require('../../helper/ressourcehelper');

const craftSpeed = 40;

async function checkSpaceships(user) {
  try {
    const buildingSpaceships = user.Spaceships.filter((spaceship) => spaceship?.State?.building);
    const spacechipToBuild = buildingSpaceships[0];

    if (buildingSpaceships.length > 0) {
      if (spacechipToBuild.State.progress === 0) {
        const { enoughtRessources, ressources } = await checkAvailableRessources(spacechipToBuild, user.id);
        if (!enoughtRessources) {
          if (!spacechipToBuild.State.waiting) {
            await updateState({ waiting: true }, spacechipToBuild.State.id);
            const message = `Wait for ressources until build ${spacechipToBuild.name} !`;
            await sendInfo(user.id, 'warning', message);
          } else {
            // wait untiel ressources
          }
        } else {
          await Promise.all(
            ressources.map(async (ressource) => {
              await updateRessource({ value: ressource.ressource.value - ressource.cost }, ressource.ressource.id);
            }),
          );
          const newProgress = spacechipToBuild.State.progress + 10;
          await updateState({ progress: newProgress }, spacechipToBuild.State.id);
          const message = `${spacechipToBuild.name} start building`;
          await sendInfo(user.id, 'info', message);
        }
      } else if (spacechipToBuild.State.progress > 0) {
        const newProgress = spacechipToBuild.State.progress + craftSpeed;
        if (newProgress >= 100) {
          updateState({ progress: 100, building: false }, spacechipToBuild.State.id);
        } else {
          updateState({ progress: newProgress }, spacechipToBuild.State.id);
        }
      }
    }
  } catch (error) {
    logger.error('checkSpaceships', error);
  }
}

module.exports = {
  checkSpaceships,
};
