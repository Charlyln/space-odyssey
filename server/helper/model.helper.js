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

const { ressources, buildings, costs, missions } = require('../constants/modelData');

const userOptions = {
  include: [
    {
      model: Ressource,
      order: [['name', 'ASC']],
      separate: true,
    },
    {
      model: Building,
      order: [['order', 'ASC']],
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
    await Ressource.increment('value', { by: -price, where: { UserId: userId, name: 'money' } });
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
      id: uuidv4(),
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
    await Promise.all(
      missions.map(async (mission) => {
        await Mission.create({
          id: uuidv4(),
          name: mission.name,
          type: mission.type,
          level: mission.level,
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
        await Cost.increment('value', { by: 10, where: { id: cost.id } });
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
      id: uuidv4(),
      name,
      PlanetId: basePlanetId,
    });

    await Promise.all(
      ressources.map(async (ressource) => {
        await Ressource.create({
          id: uuidv4(),
          name: ressource.name,
          type: ressource.type,
          value: ressource.value,
          production: ressource.production,
          storage: ressource.storage,
          price: ressource.price,
          UserId: user.id,
        });
      }),
    );

    await Promise.all(
      buildings.map(async (building) => {
        await Building.create({
          id: uuidv4(),
          name: building.name,
          type: building.type,
          production: building.production,
          order: building.order,
          UserId: user.id,
        });
      }),
    );

    await Promise.all(
      costs.map(async (cost) => {
        await Cost.create({
          id: uuidv4(),
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
      id: uuidv4(),
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
      id: uuidv4(),
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

    await mission.update({ ongoing: true, progress: 1, status: 'setup' });

    return mission;
  } catch (error) {
    logger.error('createmission', error);
    throw new Error('Create mission Error');
  }
}

async function incrementMission(value, missionId) {
  try {
    await Mission.increment('progress', { by: value, where: { id: missionId } });
  } catch (error) {
    logger.error('incrementMission', error);
  }
}

async function finishMission(missionId) {
  try {
    await Mission.update({ ongoing: false, progress: 100, status: 'finish' }, { where: { id: missionId } });
  } catch (error) {
    logger.error('finishMission', error);
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
  createMission,
  launchMission,
  createDefaultMissions,
  incrementMission,
  finishMission,
};
