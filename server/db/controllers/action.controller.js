const { v4: uuidv4 } = require('uuid');
const logger = require('../../logger');
const { Action } = require('../models/action.model');

async function create_action(req, res) {
  try {
    const { userId, type, parameters } = req.body;

    const action = await Action.create({
      id: uuidv4(),
      type,
      parameters: JSON.stringify(parameters),
      UserId: userId,
    });
    logger.info(`Create Action [${type}]`);
    res.status(200).send(action.id);
  } catch (error) {
    res.status(404).send({ error });
    logger.info('Create Action Error');
  }
}

module.exports = {
  create_action,
};
