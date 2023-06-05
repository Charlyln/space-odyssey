const { v4: uuidv4 } = require('uuid');
const moment = require('moment');

const { Info } = require('../db/models/info.model');

const { getUserData } = require('../helper/userhelper');
const { updateRessource } = require('../helper/ressourcehelper');

async function checkRessources(user) {
  const userData = await getUserData(user.id);

  await Promise.all(
    userData.Buildings.map(async (building) => {
      if (building.upgrading) {
        const newProgress = building.progress + 10;
        const updateProgress = newProgress >= 100 ? 100 : newProgress;

        if (newProgress < 110) {
          building.update({ progress: updateProgress });
        } else {
          building.update({ progress: 0, upgrading: false, level: building.level + 1 });

          const infoId = uuidv4();

          const infoData = {
            id: infoId,
            message: `${building.name} upgraded to level ${building.level} !`,
            severity: 'success',
          };

          global.io.to(global.socketIds[user.id]).emit('info', {
            ...infoData,
          });

          await Info.create({
            ...infoData,
            UserId: user.id,
          });
        }
      }

      if (building.level > 0) {
        const production = building.level * 1;

        const ressource = userData.Ressources.find((ressource) => {
          return building.production === ressource.name;
        });

        if (ressource) {
          await updateRessource(ressource.id, { value: ressource.value + production });
        }
      }
    }),
  );

  const time = moment().format('D MMM 2480 HH:mm');

  if (global.socketIds[user.id]) {
    global.io.to(global.socketIds[user.id]).emit('userData', userData);
    global.io.to(global.socketIds[user.id]).emit('ressources', { ressources: userData.Ressources, time });
  }
}

module.exports = {
  checkRessources,
};
