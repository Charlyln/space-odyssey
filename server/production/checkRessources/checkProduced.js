const { incrementRessource } = require('../../helper/ressourcehelper');

async function checkProduced(user) {
  await Promise.all(
    user.Buildings.map(async (building) => {
      if (building.level > 0) {
        const production = building.level;
        const ressource = user.Ressources.find((ressource) => {
          return building.production === ressource.name;
        });

        if (ressource) {
          await incrementRessource(production, ressource.id);
        }
      }
    }),
  );
}

module.exports = {
  checkProduced,
};
