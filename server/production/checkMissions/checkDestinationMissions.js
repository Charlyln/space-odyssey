const logger = require('../../logger');
const { progressMission, comeBackMission } = require('../../helper/model.helper');
const { getPercentProgress } = require('../../helper/utils.helper');
const { missionStatus } = require('enums');

async function checkDestinationMissions(user, checkProductionDate) {
  logger.info('11 -      Check Destination');
  try {
    const destinationMissions = user.Missions.filter((mission) => mission.status === missionStatus.destination);

    await Promise.all(
      destinationMissions.map(async (mission) => {
        const percent = getPercentProgress(mission.destinationTime, mission.missionDuration, checkProductionDate);
        if (percent >= 100) {
          await comeBackMission(mission.id, checkProductionDate);
        } else {
          await progressMission(percent, mission.id);
        }
      }),
    );
  } catch (error) {
    logger.error('checkDestinationMissions', error);
  }
}

module.exports = {
  checkDestinationMissions,
};
