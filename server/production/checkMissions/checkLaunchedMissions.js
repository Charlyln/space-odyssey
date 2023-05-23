const logger = require('../../logger');
const { progressMission, destinationMission } = require('../../helper/model.helper');
const { getPercentProgress } = require('../../helper/utils.helper');
const { missionStatus } = require('enums');

async function checkLaunchedMissions(user, checkDate) {
  logger.info('   Check Launched');
  try {
    const launchedMissions = user.Missions.filter((mission) => mission.status === missionStatus.launched);

    await Promise.all(
      launchedMissions.map(async (mission) => {
        const percent = getPercentProgress(mission.startTime, mission.travelDuration, checkDate);
        if (percent >= 100) {
          await destinationMission(mission.id, checkDate);
        } else {
          await progressMission(percent, mission.id);
        }
      }),
    );
  } catch (error) {
    logger.error('checkLaunchedMissions', error);
  }
}

module.exports = {
  checkLaunchedMissions,
};
