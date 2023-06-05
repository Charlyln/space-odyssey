const moment = require('moment');
const { checkConsumed } = require('./checkRessources/checkConsumed');
const { checkProduced } = require('./checkRessources/checkProduced');

async function checkRessources(user) {
  await checkConsumed(user);
  await checkProduced(user);

  const time = moment().format('D MMM 2480 HH:mm');

  if (global.socketIds[user.id]) {
    global.io.to(global.socketIds[user.id]).emit('userData', user);
    global.io.to(global.socketIds[user.id]).emit('ressources', { ressources: user.Ressources, time });
  }
}

module.exports = {
  checkRessources,
};
