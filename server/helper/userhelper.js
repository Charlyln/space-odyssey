const logger = require('../logger');
const { v4: uuidv4 } = require('uuid');

const { User } = require('../db/models/user.model');
const { Ressource } = require('../db/models/ressource.model');
const { Building } = require('../db/models/building.model');
const { Mission } = require('../db/models/mission.model');
const { Info } = require('../db/models/info.model');
const { Research } = require('../db/models/research.model');
const { Spaceship } = require('../db/models/spaceship.model');
const { Planet } = require('../db/models/planet.model');
const { State } = require('../db/models/state.model');
const { Cost } = require('../db/models/cost.model');
const { ressources, buildings } = require('../constants/modelData');

async function getUserData(userId) {
  try {
    const user = await User.findOne({
      where: { id: userId },
      order: [
        [{ model: Info }, 'createdAt', 'DESC'],
        [{ model: Building }, 'order', 'ASC'],
        [{ model: Spaceship }, 'createdAt', 'ASC'],
      ],
      include: [
        {
          model: Ressource,
        },
        {
          model: Building,
        },
        {
          model: Mission,
        },
        {
          model: Info,
        },
        {
          model: Research,
        },
        {
          model: Spaceship,
          include: [
            {
              model: State,
            },
          ],
        },
        {
          model: Planet,
        },
      ],
    });

    return user;
  } catch (error) {
    logger.error('getUserData', error);
  }
}

async function createUserData(name) {
  try {
    const user = await User.create({
      id: uuidv4(),
      name,
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

module.exports = {
  getUserData,
  createUserData,
  getCosts,
};
