const logger = require('../../logger');
const { updateMission } = require('../../helper/model.helper');

function padTo2Digits(num) {
  return num.toString().padStart(2, '0');
}

function convertMsToTime(milliseconds) {
  let seconds = Math.floor(milliseconds / 1000);
  let minutes = Math.floor(seconds / 60);
  let hours = Math.floor(minutes / 60);

  seconds = seconds % 60;
  minutes = minutes % 60;

  // 👇️ If you don't want to roll hours over, e.g. 24 to 00
  // 👇️ comment (or remove) the line below
  // commenting next line gets you `24:00:00` instead of `00:00:00`
  // or `36:15:31` instead of `12:15:31`, etc.
  hours = hours % 24;

  return `${padTo2Digits(hours)}h : ${padTo2Digits(minutes)} m : ${padTo2Digits(seconds)} s`;
}

async function checkLaunchMissions(user, checkProductionDate) {
  logger.info('10 -      Check Launch');
  try {
    const startingMissions = user.Missions.filter((mission) => mission.ongoing && mission.progress === 0);

    await Promise.all(
      startingMissions.map(async (mission) => {
        const duarationDisplay = convertMsToTime(mission.duration);
        logger.warn('duaration', duarationDisplay);

        const checkDate = checkProductionDate;
        logger.warn('checkDate', checkDate);
        const startTime = new Date(mission.startTime).getTime();
        logger.warn('startTime', startTime);

        const duration = mission.duration;

        const diff = checkDate - startTime;
        logger.warn('diff', diff);
        const diffDisplay = convertMsToTime(diff);
        logger.warn('diffDisplay', diffDisplay);

        const pct = ((100 * diff) / duration).toFixed(2);

        logger.warn('pct', pct, '%');

        // await updateMission(0.01, mission.id, checkProductionDate);
      }),
    );
  } catch (error) {
    logger.error('checkLaunchMissions', error);
  }
}

module.exports = {
  checkLaunchMissions,
};
