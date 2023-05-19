const moment = require('moment');

const { checkRessources } = require('./checkRessources');
const { checkBuilding } = require('./checkBuilding');
const { getUsersData } = require('../helper/model.helper');
const logger = require('../logger');

function startProduction() {
  (async function checkProduction() {
    logger.info('------------ Start Production ------------ ');
    logger.info('1 - Get Init Data');
    const users = await getUsersData();
    logger.info(`2 - Found [${users.length}] Users`);

    await Promise.all(
      users.map(async (user) => {
        await checkRessources(user);
        await checkBuilding(user);
      }),
    );

    logger.info('8 - Get Updated Data');
    const usersUpdated = await getUsersData();
    const time = moment().format('D MMM 2480 HH:mm');
    usersUpdated.map((user) => {
      if (global.socketIds[user.id]) {
        global.io.to(global.socketIds[user.id]).emit('userData', user);
        global.io.to(global.socketIds[user.id]).emit('ressources', { ressources: user.Ressources, time });
      }
    });

    logger.info('9 - Send Updated Data');
    logger.info('------------ Finish Production ------------ ');

    setTimeout(checkProduction, 5000);
  })();
}

module.exports = {
  startProduction,
};
