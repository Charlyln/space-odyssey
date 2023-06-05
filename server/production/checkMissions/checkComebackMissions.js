const logger = require('../../logger');
const { progressMission, finishMission } = require('../../helper/model.helper');
const { getPercentProgress } = require('../../helper/utlis.helper');
const { missionStatus } = require('enums/status');

async function checkComebackMissions(user, checkProductionDate) {
  logger.info('12 -      Check Comeback');
  try {
    const comebackMissions = user.Missions.filter((mission) => mission.status === missionStatus.comeback);

    await Promise.all(
      comebackMissions.map(async (mission) => {
        const percent = getPercentProgress(mission.comebackTime, mission.duration, checkProductionDate);
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
