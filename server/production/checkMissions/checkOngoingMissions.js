const logger = require('../../logger');
const { progressMission, finishMission } = require('../../helper/model.helper');
const { getPercentProgress } = require('../../helper/utlis.helper');
const { missionStatus } = require('enums/status');

async function checkOngoingMissions(user, checkProductionDate) {
  logger.info('11 -      Check Ongoing');
  try {
    const ongoingMissions = user.Missions.filter(
      (mission) =>
        mission.progress > 0 &&
        mission.status !== missionStatus.finish &&
        mission.status !== missionStatus.retreived &&
        mission.status !== missionStatus.comeback,
    );

    await Promise.all(
      ongoingMissions.map(async (mission) => {
        const percent = getPercentProgress(mission.startTime, mission.duration, checkProductionDate);
        if (percent >= 100) {
          await finishMission(mission.id);
        } else {
          await progressMission(percent, mission.id);
        }
      }),
    );
  } catch (error) {
    logger.error('checkOngoingMissions', error);
  }
}

module.exports = {
  checkOngoingMissions,
};
