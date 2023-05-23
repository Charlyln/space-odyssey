const logger = require('../../../logger');
const { sendInfo } = require('../../../helper/model.helper');
const { updateState } = require('../../../helper/model.helper');

const craftSpeed = 40;

async function checkSpaceshipsProgress(user, checkDate) {
  logger.info('      Check Progress');
  try {
    const buildingSpaceships = user.Spaceships.filter((spaceship) => spaceship?.State?.building);
    const spacechipToBuild = buildingSpaceships[0];

    if (buildingSpaceships.length > 0) {
      if (spacechipToBuild.State.progress > 0) {
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
    logger.error('checkSpaceshipsProgress', error);
  }
}

module.exports = {
  checkSpaceshipsProgress,
};
