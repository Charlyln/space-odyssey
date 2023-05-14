const { v4: uuidv4 } = require('uuid');
const { User } = require('./db/models/user.model');
const { Ressource } = require('./db/models/ressource.model');
const { Building } = require('./db/models/building.model');
const { Info } = require('./db/models/info.model');

async function checkEngine() {
  const usersData = await User.findAll({
    include: [
      {
        model: Ressource,
      },
      {
        model: Building,
      },
    ],
  });

  await Promise.all(
    usersData.map(async (user) => {
      await Promise.all(
        user.Buildings.map(async (building) => {
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

              global.io.emit('info', {
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

            const ressource = user.Ressources.find((ressource) => {
              return building.name.toLowerCase().includes(ressource.name);
            });

            ressource.update({ value: ressource.value + production });
          }
        }),
      );
    }),
  );
}

let checkInterval;

async function startCheck() {
  checkInterval = setInterval(checkEngine, 2000);
}

module.exports = {
  startCheck,
};
