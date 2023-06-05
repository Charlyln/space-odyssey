const { checkFacilities } = require('./checkBuilding/checkFacilities');
const { checkSpaceships } = require('./checkBuilding/checkSpaceships');

async function checkBuilding(user) {
  await checkSpaceships(user);
  await checkFacilities(user);
}

module.exports = {
  checkBuilding,
};
