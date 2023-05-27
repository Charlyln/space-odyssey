const logger = require('../logger');

const { incrementRessource, decrementMoney, createTrade } = require('../helper/model.helper');

async function handleBuyRessource(action) {
  let parameters;
  try {
    const { id, quantity, price, name } = action.parameters;

    parameters = action.parameters;

    await incrementRessource(quantity, id);
    await decrementMoney(price, action.userId);

    const trade = await createTrade(name, price, quantity, 'success', 'purchase', action.userId);
    return trade;
  } catch (error) {
    const { quantity, price, name } = parameters;
    const trade = await createTrade(name, price, quantity, 'error', 'purchase', action.userId);
    logger.error('BuyRessource', error);
    return trade;
  }
}

module.exports = {
  handleBuyRessource,
};
