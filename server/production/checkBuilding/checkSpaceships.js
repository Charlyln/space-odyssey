const { DataTypes } = require('sequelize');
const { Spaceship } = require('../../db/models/spaceship.model');
const { Ressource } = require('../../db/models/ressource.model');
const { State } = require('../../db/models/state.model');
const { Cost } = require('../../db/models/cost.model');
const logger = require('../../logger');

const craftSpeed = 40;

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

      if (spacechipToBuild.State.progress === 0) {
        const spacechipsCosts = await Cost.findAll({
          where: { craft: spacechipToBuild.name },
        });

        let enoughtRessources = true;

        const ressources = [];

        if (spacechipsCosts.length > 0) {
          await Promise.all(
            spacechipsCosts.map(async (spacechipsCost) => {
              const ressource = await Ressource.findOne({
                where: { name: spacechipsCost.ressource },
              });

              if (ressource.value >= spacechipsCost.value) {
                ressources.push({ ressource, cost: spacechipsCost.value });
              } else {
                enoughtRessources = false;
              }
            }),
          );

          if (enoughtRessources) {
            try {
              await Promise.all(
                ressources.map(async (ressource) => {
                  await Ressource.update(
                    { value: ressource.ressource.value - ressource.cost },
                    {
                      where: {
                        id: ressource.ressource.id,
                      },
                    },
                  );
                }),
              );

              const newProgress = spacechipToBuild.State.progress + craftSpeed;

              await State.update(
                { progress: newProgress },
                {
                  where: {
                    id: spacechipToBuild.State.id,
                  },
                },
              );
            } catch (error) {
              console.log(error);
            }
          }
        }
      } else {
        const newProgress = spacechipToBuild.State.progress + craftSpeed;
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
      }
    }
  } catch (error) {
    logger.error('checkSpaceships');
  }
}

module.exports = {
  checkSpaceships,
};
