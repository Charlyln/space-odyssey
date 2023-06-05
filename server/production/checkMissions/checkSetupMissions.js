const logger = require('../../logger');
const { launchMission } = require('../../helper/model.helper');
const { missionStatus } = require('enums');

async function checkSetupMissions(user) {
  logger.info('10 -      Check Setup');
  try {
    const setupMissions = user.Missions.filter((mission) => mission.status === missionStatus.setup);

    await Promise.all(
      setupMissions.map(async (mission) => {
        const missionCanLaunch = true;
        if (missionCanLaunch) {
          await launchMission(mission.id);
        }
      }),
    );
  } catch (error) {
    logger.error('checkSetupMissions', error);
  }
}

module.exports = {
  checkSetupMissions,
};
