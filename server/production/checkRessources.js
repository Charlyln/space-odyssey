const { v4: uuidv4 } = require('uuid');

const { User } = require('../db/models/user.model');
const { Ressource } = require('../db/models/ressource.model');
const { Building } = require('../db/models/building.model');
const { Battle } = require('../db/models/battle.model');
const { Mission } = require('../db/models/mission.model');
const { Info } = require('../db/models/info.model');
const { Research } = require('../db/models/research.model');
const { Spaceship } = require('../db/models/spaceship.model');
const { Planet } = require('../db/models/planet.model');

async function checkRessources(user) {
  const userData = await User.findOne({
    where: { id: user.id },
    order: [
      [{ model: Info }, 'createdAt', 'DESC'],
      [{ model: Building }, 'createdAt', 'ASC'],
    ],
    include: [
      {
        model: Ressource,
      },
      {
        model: Building,
      },
      {
        model: Battle,
      },
      {
        model: Mission,
      },
      {
        model: Info,
        order: [['createdAt', 'ASC']],
      },
      {
        model: Research,
      },
      {
        model: Spaceship,
      },
      {
        model: Planet,
      },
    ],
  });

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
          return building.name.toLowerCase().includes(ressource.name);
        });

        ressource.update({ value: ressource.value + production });
      }
    }),
  );

  if (global.socketIds[user.id]) {
    global.io.to(global.socketIds[user.id]).emit('userData', userData);
  }
}

module.exports = {
  checkRessources,
};
