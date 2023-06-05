const { v4: uuidv4 } = require('uuid');
const { User } = require('./db/models/user.model');
const { Ressource } = require('./db/models/ressource.model');
const { Building } = require('./db/models/building.model');

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
              global.io.emit('info', {
                id: uuidv4(),
                message: `${building.name} upgraded to level ${building.level} !`,
                severity: 'success',
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
  const user = await User.create({
    id: 1,
  });

  await Building.create({
    id: uuidv4(),
    name: 'Steel mine',
    type: 'mine',
    UserId: user.id,
  });

  await Building.create({
    id: uuidv4(),
    name: 'Gold mine',
    type: 'mine',
    UserId: user.id,
  });

  await Ressource.create({
    id: uuidv4(),
    name: 'steel',
    value: 30,
    UserId: user.id,
  });

  await Ressource.create({
    id: uuidv4(),
    name: 'gold',
    value: 0,
    UserId: user.id,
  });

  await Ressource.create({
    id: uuidv4(),
    name: 'people',
    value: 10,
    UserId: user.id,
  });

  await Ressource.create({
    id: uuidv4(),
    name: 'spaceship',
    value: 1,
    UserId: user.id,
  });

  await Ressource.create({
    id: uuidv4(),
    name: 'food',
    value: 10,
    UserId: user.id,
  });

  await Ressource.create({
    id: uuidv4(),
    name: 'energy',
    value: 100,
    UserId: user.id,
  });

  await Ressource.create({
    id: uuidv4(),
    name: 'plutonium',
    value: 0,
    UserId: user.id,
  });

  checkInterval = setInterval(checkEngine, 2000);
}

module.exports = {
  startCheck,
};
