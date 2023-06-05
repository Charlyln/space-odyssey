const logger = require('../../logger');
const { progressMission } = require('../../helper/model.helper');
const { getPercentProgress } = require('../../helper/utlis.helper');
const { missionStatus } = require('enums/status');

async function checkLaunchMissions(user, checkProductionDate) {
  logger.info('10 -      Check Launch');
  try {
    const startingMissions = user.Missions.filter(
      (mission) => mission.status === missionStatus.setup && mission.startTime && mission.progress === 0,
    );

    await Promise.all(
      startingMissions.map(async (mission) => {
        // const missionCanLaunch = await checkRessourcesToLaunch(mission.id);
        const missionCanLaunch = true;

        if (missionCanLaunch) {
          const percent = getPercentProgress(mission.startTime, mission.duration, checkProductionDate);
          await progressMission(percent, mission.id);
        }
      }),
    );
  } catch (error) {
    logger.error('checkLaunchMissions', error);
  }
}

module.exports = {
  checkLaunchMissions,
};
