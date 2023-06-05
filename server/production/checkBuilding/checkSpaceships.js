const { DataTypes } = require('sequelize');
const { Spaceship } = require('../../db/models/spaceship.model');
const { State } = require('../../db/models/state.model');
const logger = require('../../logger');

async function checkSpaceships(user) {
  try {
    const spaceships = await Spaceship.findAll({
      where: { UserId: user.id },
      include: [
        {
          model: State,
          where: { building: true },
        },
      ],
    });

    await Promise.all(
      spaceships.map(async (spaceship) => {
        try {
          const newProgress = spaceship.State.progress + 10;

          if (newProgress >= 100) {
            await State.update(
              { progress: 100, building: false },
              {
                where: {
                  id: spaceship.State.id,
                },
              },
            );
          } else {
            await State.update(
              { progress: newProgress },
              {
                where: {
                  id: spaceship.State.id,
                },
              },
            );
          }
        } catch (error) {
          console.log(error);
        }
      }),
    );
  } catch (error) {
    logger.error('checkSpaceships');
  }
}

module.exports = {
  checkSpaceships,
};
