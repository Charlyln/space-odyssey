const logger = require('../../logger');
const { incrementMission, finishMission } = require('../../helper/model.helper');

async function checkOngoingMissions(user) {
  logger.info('11 -      Check Ongoing');
  try {
    const startingMissions = user.Missions.filter((mission) => mission.progress > 0);

    await Promise.all(
      startingMissions.map(async (mission) => {
        if (mission.progress > 99) {
          await finishMission(mission.id);
        } else {
          await incrementMission(20, mission.id);
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
