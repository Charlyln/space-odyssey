const moment = require('moment');

const { checkRessources } = require('./checkRessources');
const { checkBuilding } = require('./checkBuilding');
const { getUsersData } = require('../helper/userhelper');

async function checkProduction() {
  const users = await getUsersData();

  await Promise.all(
    users.map(async (user) => {
      await checkRessources(user);
      await checkBuilding(user);
    }),
  );

  const usersUpdated = await getUsersData();

  const time = moment().format('D MMM 2480 HH:mm');

  usersUpdated.map((user) => {
    if (global.socketIds[user.id]) {
      global.io.to(global.socketIds[user.id]).emit('userData', user);
      global.io.to(global.socketIds[user.id]).emit('ressources', { ressources: user.Ressources, time });
    }
  });
}

let checkInterval;

async function startProduction() {
  checkInterval = setInterval(checkProduction, 5000);
}

module.exports = {
  startProduction,
};
