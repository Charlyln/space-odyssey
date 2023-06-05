const logger = require('../../logger');
const { progressMission, finishMission } = require('../../helper/model.helper');
const { getPercentProgress } = require('../../helper/utils.helper');
const { missionStatus } = require('enums');

async function checkComebackMissions(user, checkDate) {
  logger.info('   Check Comeback');
  try {
    const comebackMissions = user.Missions.filter((mission) => mission.status === missionStatus.comeback);

    await Promise.all(
      comebackMissions.map(async (mission) => {
        const percent = getPercentProgress(mission.comebackTime, mission.travelDuration, checkDate);
        if (percent >= 100) {
          await finishMission(mission.id);
        } else {
          await progressMission(percent, mission.id);
        }
      }),
    );
  } catch (error) {
    logger.error('checkcomebackMissions', error);
  }
}

module.exports = {
  checkComebackMissions,
};
