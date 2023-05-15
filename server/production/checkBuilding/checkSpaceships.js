const { DataTypes } = require('sequelize');
const { Spaceship } = require('../../db/models/spaceship.model');
const { State } = require('../../db/models/state.model');
const logger = require('../../logger');

async function checkSpaceships(user) {
  try {
    const spacechipsToBuild = await Spaceship.findAll({
      where: { UserId: user.id },
      order: [[{ model: State }, 'createdAt', 'ASC']],
      include: [
        {
          model: State,
          where: { building: true },
        },
      ],
    });

    if (spacechipsToBuild.length > 0) {
      const spacechipToBuild = spacechipsToBuild[0];

      try {
        const newProgress = spacechipToBuild.State.progress + 40;

        if (newProgress >= 100) {
          await State.update(
            { progress: 100, building: false },
            {
              where: {
                id: spacechipToBuild.State.id,
              },
            },
          );
        } else {
          await State.update(
            { progress: newProgress },
            {
              where: {
                id: spacechipToBuild.State.id,
              },
            },
          );
        }
      } catch (error) {
        console.log(error);
      }
    }
  } catch (error) {
    logger.error('checkSpaceships');
  }
}

module.exports = {
  checkSpaceships,
};
