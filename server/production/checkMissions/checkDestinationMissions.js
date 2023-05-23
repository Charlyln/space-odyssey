const logger = require('../../logger');
const { progressMission, comeBackMission } = require('../../helper/model.helper');
const { getPercentProgress } = require('../../helper/utils.helper');
const { missionStatus } = require('enums');

async function checkDestinationMissions(user, checkDate) {
  logger.info('   Check Destination');
  try {
    const destinationMissions = user.Missions.filter((mission) => mission.status === missionStatus.destination);

    await Promise.all(
      destinationMissions.map(async (mission) => {
        const percent = getPercentProgress(mission.destinationTime, mission.missionDuration, checkDate);
        if (percent >= 100) {
          await comeBackMission(mission.id, checkDate);
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
