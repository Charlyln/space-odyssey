const { checkRessources } = require('./checkRessources');
const { checkBuilding } = require('./checkBuilding');
const { getUsersData } = require('../helper/userhelper');

async function checkProduction() {
  const users = await getUsersData();

  await Promise.all(
    users.map(async (user) => {
      await checkBuilding(user);
      await checkRessources(user);
    }),
  );
}

let checkInterval;

async function startProduction() {
  checkInterval = setInterval(checkProduction, 5000);
}

module.exports = {
  startProduction,
};
