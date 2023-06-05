const logger = require('../../logger');
const { incrementMission } = require('../../helper/model.helper');

async function checkLaunchMissions(user) {
  logger.info('10 -      Check Launch');
  try {
    const startingMissions = user.Missions.filter((mission) => mission.ongoing && mission.progress === 0);

    await Promise.all(
      startingMissions.map(async (mission) => {
        await incrementMission(1, mission.id);
      }),
    );
  } catch (error) {
    logger.error('checkLaunchMissions', error);
  }
}

module.exports = {
  checkLaunchMissions,
};
