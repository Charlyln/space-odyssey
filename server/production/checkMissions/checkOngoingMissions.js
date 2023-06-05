const logger = require('../../logger');
const { updateMission, finishMission } = require('../../helper/model.helper');

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

async function checkOngoingMissions(user, checkProductionDate) {
  logger.info('11 -      Check Ongoing');
  try {
    const ongoingMissions = user.Missions.filter((mission) => mission.progress > 0 && mission.status !== 'retreived');

    await Promise.all(
      ongoingMissions.map(async (mission) => {
        // const checkDate = checkProductionDate;
        // const startTime = new Date(mission.startTime).getTime();
        // const duration = mission.duration;
        // const diff = checkDate - startTime;
        // const pct = ((100 * diff) / duration).toFixed(2);
        // logger.warn(pct)
        // logger.warn('duaration', duarationDisplay);
        // logger.warn('checkDate', checkDate);
        // logger.warn('startTime', startTime);
        // logger.warn('diff', diff);
        // logger.warn('diffDisplay', diffDisplay);
        // logger.warn('pct', pct, '%');

        const duarationDisplay = convertMsToTime(mission.duration);
        const checkDate = checkProductionDate;
        const startTime = new Date(mission.startTime).getTime();
        const duration = mission.duration;
        const diff = checkDate - startTime;
        const diffDisplay = convertMsToTime(diff);
        const pct = ((100 * diff) / duration).toFixed(2);

        if (pct >= 100) {
          await finishMission(mission.id);
        } else {
          await updateMission(pct, mission.id);
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
