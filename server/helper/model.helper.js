const logger = require('../logger');
const { v4: uuidv4 } = require('uuid');

const { User } = require('../db/models/user.model');
const { Ressource } = require('../db/models/ressource.model');
const { Building } = require('../db/models/building.model');
const { Mission } = require('../db/models/mission.model');
const { Info } = require('../db/models/info.model');
const { Research } = require('../db/models/research.model');
const { Spaceship } = require('../db/models/spaceship.model');
const { State } = require('../db/models/state.model');
const { Cost } = require('../db/models/cost.model');
const { Trade } = require('../db/models/trade.model');
const { Planet } = require('../db/models/planet.model');
const { Galaxy } = require('../db/models/galaxy.model');
const { System } = require('../db/models/system.model');

const { Colonist } = require('../db/models/colonist.model');
const { Money } = require('../db/models/money.model');

const { faker } = require('@faker-js/faker');

const { ressources, buildings, costs, missions } = require('../constants/modelData');
const { missionStatus } = require('enums');
const { randomIntFromInterval } = require('./utils.helper');

const userOptions = {
  include: [
    {
      model: Ressource,
      order: [['name', 'ASC']],
      separate: true,
    },
    {
      model: Building,
      separate: true,
    },
    {
      model: Mission,
      separate: true,
    },
    {
      model: Info,
      order: [['createdAt', 'DESC']],
      separate: true,
    },
    {
      model: Research,
      separate: true,
    },
    {
      model: Spaceship,
      order: [['createdAt', 'ASC']],
      separate: true,
      include: [
        {
          model: State,
        },
      ],
    },
    {
      model: Cost,
      separate: true,
    },
    {
      model: Trade,
      order: [['createdAt', 'DESC']],
      separate: true,
    },
    {
      model: Planet,
      include: [
        {
          model: System,
          include: [
            {
              model: Planet,
              separate: true,
            },
          ],
        },
      ],
    },
    {
      model: Colonist,
      separate: true,
    },
    {
      model: Money,
    },
  ],
};

async function getUserData(userId) {
  try {
    const user = await User.findOne({
      where: { id: userId },
      ...userOptions,
    });

    return user;
  } catch (error) {
    logger.error('getUserData', error);
  }
}

async function getUsersData() {
  try {
    const users = await User.findAll(userOptions);
    return users;
  } catch (error) {
    logger.error('getUsersData', error);
  }
}

async function updateRessource(data, ressourceId) {
  try {
    await Ressource.update({ ...data }, { where: { id: ressourceId } });
  } catch (error) {
    logger.error('updateRessource', error);
  }
}

async function updateRessourceProduction(production, ressourceName, userId) {
  try {
    const ressource = await Ressource.findOne({
      where: { name: ressourceName, UserId: userId },
    });

    await ressource.update({ production });
  } catch (error) {
    logger.error('updateRessource', error);
  }
}

async function incrementRessource(value, ressourceId) {
  try {
    await Ressource.increment('value', { by: value, where: { id: ressourceId } });
  } catch (error) {
    logger.error('incrementRessource', error);
  }
}

async function decrementRessource(value, ressourceId) {
  try {
    await Ressource.increment('value', { by: -value, where: { id: ressourceId } });
  } catch (error) {
    logger.error('decrementRessource', error);
  }
}

async function decrementMoney(price, userId) {
  try {
    await Money.increment('value', { by: -price, where: { UserId: userId } });
  } catch (error) {
    logger.error('decrementMoney', error);
  }
}

async function updateBuilding(data, buildingId) {
  try {
    await Building.update({ ...data }, { where: { id: buildingId } });
  } catch (error) {
    logger.error('updatebuilding', error);
  }
}

async function updateState(data, stateId) {
  try {
    await State.update({ ...data }, { where: { id: stateId } });
  } catch (error) {
    logger.error('updateState', error);
  }
}

async function createTrade(ressource, price, quantity, status, type, userId) {
  try {
    const trade = await Trade.create({
      ressource: ressource,
      price: price,
      quantity: quantity,
      status: status,
      type: type,
      UserId: userId,
    });

    return trade;
  } catch (error) {
    logger.error('createTrade', error);
    throw new Error('Create Trade Error');
  }
}

async function createDefaultMissions(userId) {
  try {
    const minute = 60000;
    await Promise.all(
      missions.map(async (mission, i) => {
        await Mission.create({
          name: mission.name,
          type: mission.type,
          level: mission.level,
          travelDuration: minute / 3,
          missionDuration: minute / 3,
          UserId: userId,
        });
      }),
    );
  } catch (error) {
    logger.error('createmission', error);
  }
}

async function increaseCosts(costs) {
  try {
    await Promise.all(
      costs.map(async (cost) => {
        await Cost.increment('value', { by: cost.value, where: { id: cost.id } });
      }),
    );
  } catch (error) {
    logger.error('increaseCosts', error);
  }
}

async function checkAvailableRessources(building, userId) {
  try {
    const costs = await Cost.findAll({
      where: { craft: building.name },
    });

    if (costs.length > 0) {
      const reponses = await Promise.all(
        costs.map(async (cost) => {
          const ressource = await Ressource.findOne({
            where: { name: cost.ressource, UserId: userId },
          });

          if (ressource.value >= cost.value) {
            return { response: true, value: cost.value, ressourceId: ressource.id };
          } else {
            return { response: false, value: cost.value, ressourceId: ressource.id };
          }
        }),
      );

      const checker = (arr) => arr.every((v) => v.response === true);

      if (checker(reponses)) {
        await Promise.all(
          reponses.map(async (reponse) => {
            await decrementRessource(reponse.value, reponse.ressourceId);
          }),
        );
        return true;
      } else {
        return false;
      }
    }
  } catch (error) {
    logger.error('checkAvailableRessources', error);
    return false;
  }
}

async function getServerData() {
  try {
    const galaxies = await Galaxy.findAll({
      include: [
        {
          model: System,
          separate: true,
          include: [
            {
              model: Planet,
              separate: true,
            },
          ],
        },
      ],
    });

    return { galaxies };
  } catch (error) {
    logger.error('getServerData', error);
  }
}

async function createUserData(name, basePlanetId) {
  try {
    const user = await User.create({
      name,
      PlanetId: basePlanetId,
    });

    await Promise.all(
      ressources.map(async (ressource) => {
        await Ressource.create({
          name: ressource.name,
          type: ressource.type,
          value: ressource.value,
          production: ressource.production,
          consumption: ressource.consumption,
          storage: ressource.storage,
          price: ressource.price,
          UserId: user.id,
        });
      }),
    );

    async function createColonists() {
      const colonistNbr = 10;
      for (let i = 0; i < colonistNbr; i++) {
        await Colonist.create({
          name: faker.person.fullName(),
          age: randomIntFromInterval(25, 50),
          UserId: user.id,
        });
      }
    }

    await Money.create({
      UserId: user.id,
    });

    await createColonists();

    await Promise.all(
      buildings.map(async (building) => {
        await Building.create({
          name: building.name,
          type: building.type,
          production: building.production,
          UserId: user.id,
        });
      }),
    );

    await Promise.all(
      costs.map(async (cost) => {
        await Cost.create({
          craft: cost.craft,
          value: cost.value,
          ressource: cost.ressource,
          UserId: user.id,
        });
      }),
    );

    return user;
  } catch (error) {
    logger.error('createUserData', error);
  }
}

async function getCosts() {
  try {
    const costs = await Cost.findAll();
    return costs;
  } catch (error) {
    logger.error('getCosts', error);
  }
}

async function sendInfo(userId, severity, message, icon) {
  try {
    const infoData = {
      message,
      severity,
      icon,
    };

    global.io.to(global.socketIds[userId]).emit('info', {
      ...infoData,
    });

    await Info.create({
      ...infoData,
      UserId: userId,
    });
  } catch (error) {
    logger.error('sendInfo', error);
  }
}

async function createMission(userId) {
  try {
    const mission = await Mission.create({
      type: 'Rescue',
      level: 1,
      UserId: userId,
    });

    return mission;
  } catch (error) {
    logger.error('createmission', error);
    throw new Error('Create mission Error');
  }
}

async function launchMission(missionId) {
  try {
    const mission = await Mission.findOne({
      where: {
        id: missionId,
      },
    });

    await mission.update({ status: missionStatus.launched });

    return mission;
  } catch (error) {
    logger.error('createmission', error);
    throw new Error('Create mission Error');
  }
}

async function startMission(missionId, actionDate) {
  try {
    const mission = await Mission.findOne({
      where: {
        id: missionId,
      },
    });
    await mission.update({ status: missionStatus.setup, startTime: actionDate });
    return mission;
  } catch (error) {
    logger.error('createmission', error);
    throw new Error('Create mission Error');
  }
}

async function progressMission(percent, missionId) {
  try {
    const mission = await Mission.findOne({
      where: {
        id: missionId,
      },
    });
    await mission.update({ progress: percent });
  } catch (error) {
    logger.error('progressMission', error);
  }
}

async function comeBackMission(missionId, comebackTime) {
  try {
    const mission = await Mission.findOne({
      where: {
        id: missionId,
      },
    });

    await mission.update({ status: missionStatus.comeback, progress: 0, comebackTime }, { where: { id: missionId } });
  } catch (error) {
    logger.error('comeBackMission', error);
  }
}

async function finishMission(missionId) {
  try {
    await Mission.update({ progress: 100, status: missionStatus.finish }, { where: { id: missionId } });
  } catch (error) {
    logger.error('finishMission', error);
  }
}

async function destinationMission(missionId, destinationTime) {
  try {
    await Mission.update({ progress: 0, status: missionStatus.destination, destinationTime }, { where: { id: missionId } });
  } catch (error) {
    logger.error('finishMission', error);
  }
}

async function retreiveMission(missionId) {
  try {
    const mission = await Mission.findOne({
      where: {
        id: missionId,
      },
    });

    await mission.update({ progress: 100, status: missionStatus.retreived });
    return mission;
  } catch (error) {
    logger.error('retreiveMission', error);
  }
}

module.exports = {
  updateRessource,
  updateBuilding,
  checkAvailableRessources,
  updateState,
  incrementRessource,
  decrementRessource,
  increaseCosts,
  decrementMoney,
  createTrade,
  getUserData,
  createUserData,
  getCosts,
  getUsersData,
  sendInfo,
  getServerData,
  createDefaultMissions,
  createMission,
  startMission,
  launchMission,
  progressMission,
  comeBackMission,
  finishMission,
  retreiveMission,
  destinationMission,
  updateRessourceProduction,
};
