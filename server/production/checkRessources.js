const moment = require('moment');

const { updateRessource } = require('../helper/ressourcehelper');

async function checkRessources(userData) {
  await Promise.all(
    userData.Buildings.map(async (building) => {
      if (building.level > 0) {
        const production = building.level;
        const ressource = userData.Ressources.find((ressource) => {
          return building.production === ressource.name;
        });

        if (ressource) {
          await updateRessource({ value: ressource.value + production }, ressource.id);
        }
      }
    }),
  );

  const time = moment().format('D MMM 2480 HH:mm');

  if (global.socketIds[userData.id]) {
    global.io.to(global.socketIds[userData.id]).emit('userData', userData);
    global.io.to(global.socketIds[userData.id]).emit('ressources', { ressources: userData.Ressources, time });
  }
}

module.exports = {
  checkRessources,
};
