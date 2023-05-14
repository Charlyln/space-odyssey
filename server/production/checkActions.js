const { v4: uuidv4 } = require('uuid');

const { Action } = require('../db/models/action.model');
const { handleUpgradeBuilding } = require('../helper/actionhelper');
const logger = require('../logger');

async function checkActions(user) {
  try {
    const actions = await Action.findAll({ where: { UserId: user.id } });

    if (actions.length > 0) {
      logger.info(`[${actions.length}] Actions stacked`);

      await Promise.all(
        actions.map(async (action) => {
          switch (action.type) {
            case 'UpgradeBuilding':
              await handleUpgradeBuilding(action);
              break;

            default:
              break;
          }
          await action.destroy();
        }),
      );
    }
  } catch (error) {}
}

module.exports = {
  checkActions,
};
