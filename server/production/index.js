const moment = require('moment');
const logger = require('../logger');
const { getUsersData } = require('../helper/model.helper');

const { checkRessources } = require('./checkRessources');
const { checkBuildings } = require('./checkBuildings');
const { checkMissions } = require('./checkMissions');

const interval = 5 * 1000;

function startProduction() {
  (async function checkProduction() {
    logger.info('------------ Start Production ------------ ');
    const checkDate = new Date();
    logger.info('Get Data');
    const users = await getUsersData();
    logger.info(`Data Received`);

    await Promise.all(
      users.map(async (user) => {
        await checkRessources(user, checkDate);
        await checkBuildings(user, checkDate);
        await checkMissions(user, checkDate);
      }),
    );

    logger.info('Get New Data');
    const usersUpdated = await getUsersData();
    const time = moment().format('D MMM 2480 HH:mm');
    usersUpdated.map((user) => {
      if (global.socketIds[user.id]) {
        global.io.to(global.socketIds[user.id]).emit('userData', user);
        global.io.to(global.socketIds[user.id]).emit('ressources', { ressources: user.Ressources, time });
      }
    });

    logger.info('Send New Data');
    logger.info('------------ Finish Production ------------ ');

    setTimeout(checkProduction, interval);
  })();
}

module.exports = {
  startProduction,
};
