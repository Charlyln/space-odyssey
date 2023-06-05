const { v4: uuidv4 } = require('uuid');

const { Action } = require('../db/models/action.model');
const { handleUpgradeBuilding, handleBuildSpaceship } = require('../helper/actionhelper');
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

            case 'BuildSpaceship':
              await handleBuildSpaceship(action);
              break;

            default:
              break;
          }

          try {
            await Action.destroy({
              where: {
                id: action.id,
              },
            });
          } catch (error) {
            console.log(error);
          }
        }),
      );
    }
  } catch (error) {
    logger.error('checkActions error');
  }
}

module.exports = {
  checkActions,
};
