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

const { ressources, buildings, costs } = require('../constants/modelData');

// const userOptions = {
//   order: [
//     [{ model: Info }, 'createdAt', 'DESC'],
//     [{ model: Trade }, 'createdAt', 'DESC'],
//     [{ model: Building }, 'order', 'ASC'],
//     [{ model: Spaceship }, 'createdAt', 'ASC'],
//     [{ model: Ressource }, 'name', 'ASC'],
//   ],
//   include: [
//     {
//       model: Ressource,
//     },
//     {
//       model: Building,
//     },
//     {
//       model: Mission,
//     },
//     {
//       model: Info,
//     },
//     {
//       model: Research,
//     },
//     {
//       model: Spaceship,
//       include: [
//         {
//           model: State,
//         },
//       ],
//     },
//     {
//       model: Planet,
//     },
//     {
//       model: Cost,
//     },
//     {
//       model: Trade,
//     },
//   ],
// };

async function getUserData(userId) {
  try {
    const user = await User.findOne({
      where: { id: userId },
      order: [
        [{ model: Info }, 'createdAt', 'DESC'],
        [{ model: Trade }, 'createdAt', 'DESC'],
        [{ model: Building }, 'order', 'ASC'],
        [{ model: Spaceship }, 'createdAt', 'ASC'],
        [{ model: Ressource }, 'name', 'ASC'],
      ],
      include: [
        {
          model: Ressource,
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
          separate: true,
        },
        {
          model: Research,
          separate: true,
        },
        {
          model: Spaceship,
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
          separate: true,
        },
      ],
    });

    return user;
  } catch (error) {
    logger.error('getUserData', error);
  }
}

async function getUsersData() {
  try {
    const users = await User.findAll({
      order: [
        [{ model: Info }, 'createdAt', 'DESC'],
        [{ model: Trade }, 'createdAt', 'DESC'],
        [{ model: Building }, 'order', 'ASC'],
        [{ model: Spaceship }, 'createdAt', 'ASC'],
        [{ model: Ressource }, 'name', 'ASC'],
      ],
      include: [
        {
          model: Ressource,
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
          separate: true,
        },
        {
          model: Research,
          separate: true,
        },
        {
          model: Spaceship,
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
          separate: true,
        },
      ],
    });

    return users;
  } catch (error) {
    logger.error('getUsersData', error);
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

module.exports = {
  getUserData,
  createUserData,
  getCosts,
  getUsersData,
  sendInfo,
};
