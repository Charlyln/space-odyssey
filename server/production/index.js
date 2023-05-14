const { User } = require('../db/models/user.model');

const { checkActions } = require('./checkActions');
const { checkRessources } = require('./checkRessources');

async function checkProduction() {
  const users = await User.findAll();

  await Promise.all(
    users.map(async (user) => {
      await checkActions(user);
      await checkRessources(user);
    }),
  );
}

let checkInterval;

async function startProduction() {
  checkInterval = setInterval(checkProduction, 4000);
}

module.exports = {
  startProduction,
};
