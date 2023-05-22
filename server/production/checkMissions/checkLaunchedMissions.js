const logger = require('../../logger');
const { progressMission, destinationMission } = require('../../helper/model.helper');
const { getPercentProgress } = require('../../helper/utils.helper');
const { missionStatus } = require('enums');

async function checkLaunchedMissions(user, checkProductionDate) {
  logger.info('11 -      Check Launched');
  try {
    const launchedMissions = user.Missions.filter((mission) => mission.status === missionStatus.launched);

    await Promise.all(
      launchedMissions.map(async (mission) => {
        const percent = getPercentProgress(mission.startTime, mission.travelDuration, checkProductionDate);
        if (percent >= 100) {
          await destinationMission(mission.id, checkProductionDate);
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
