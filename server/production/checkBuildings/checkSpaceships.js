const logger = require('../../logger');
const { sendInfo } = require('../../helper/model.helper');
const { checkAvailableRessources, updateState } = require('../../helper/model.helper');

const craftSpeed = 40;

async function checkSpaceships(user) {
  logger.info(' 7 -      Check Spaceships');
  try {
    const buildingSpaceships = user.Spaceships.filter((spaceship) => spaceship?.State?.building);
    const spacechipToBuild = buildingSpaceships[0];

    if (buildingSpaceships.length > 0) {
      if (spacechipToBuild.State.progress === 0) {
        const enoughtRessources = await checkAvailableRessources(spacechipToBuild, user.id);
        if (!enoughtRessources) {
          if (!spacechipToBuild.State.waiting) {
            await updateState({ waiting: true }, spacechipToBuild.State.id);
            const message = `Wait for ressources until build ${spacechipToBuild.name}`;
            await sendInfo(user.id, 'warning', message, 'building');
          } else {
            // wait untiel ressources
          }
        } else {
          const newProgress = spacechipToBuild.State.progress + 10;
          await updateState({ progress: newProgress }, spacechipToBuild.State.id);
          const message = `${spacechipToBuild.name} start building`;
          await sendInfo(user.id, 'info', message, 'building');
        }
      } else if (spacechipToBuild.State.progress > 0) {
        const newProgress = spacechipToBuild.State.progress + craftSpeed;
        if (newProgress >= 100) {
          await updateState({ progress: 100, building: false }, spacechipToBuild.State.id);
          const message = `${spacechipToBuild.name} just finish building`;
          await sendInfo(user.id, 'success', message, 'building');
        } else {
          await updateState({ progress: newProgress }, spacechipToBuild.State.id);
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
