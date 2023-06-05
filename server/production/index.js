const moment = require('moment');
const logger = require('../logger');
const { getUsersData } = require('../helper/model.helper');

const { checkRessources } = require('./checkRessources');
const { checkBuildings } = require('./checkBuildings');
const { checkMissions } = require('./checkMissions');

function startProduction() {
  (async function checkProduction() {
    logger.info('------------ Start Production ------------ ');
    logger.info(' 1 - Get Data');
    const users = await getUsersData();
    logger.info(` 2 - Data Received`);

    await Promise.all(
      users.map(async (user) => {
        await checkRessources(user);
        await checkBuildings(user);
        await checkMissions(user);
      }),
    );

    logger.info('12 - Get New Data');
    const usersUpdated = await getUsersData();
    const time = moment().format('D MMM 2480 HH:mm');
    usersUpdated.map((user) => {
      if (global.socketIds[user.id]) {
        global.io.to(global.socketIds[user.id]).emit('userData', user);
        global.io.to(global.socketIds[user.id]).emit('ressources', { ressources: user.Ressources, time });
      }
    });

    logger.info('13 - Send New Data');
    logger.info('------------ Finish Production ------------ ');

    setTimeout(checkProduction, 10000);
  })();
}

module.exports = {
  startProduction,
};
