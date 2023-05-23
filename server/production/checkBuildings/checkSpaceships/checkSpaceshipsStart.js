const logger = require('../../../logger');
const { sendInfo } = require('../../../helper/model.helper');
const { checkAvailableRessources, updateState } = require('../../../helper/model.helper');

async function checkSpaceshipsStart(user, checkDate) {
  logger.info('      Check Start');
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
      }
    }
  } catch (error) {
    logger.error('checkSpaceshipsStart', error);
  }
}

module.exports = {
  checkSpaceshipsStart,
};
