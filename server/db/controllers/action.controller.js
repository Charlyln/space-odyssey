const { v4: uuidv4 } = require('uuid');
const logger = require('../../logger');
const { Action } = require('../models/action.model');
const { handleActions } = require('../../helper/actionhelper');

async function handle_action(req, res) {
  try {
    const response = await handleActions(req.body);

    // await Action.create({
    //   id: uuidv4(),
    //   type,
    //   parameters: JSON.stringify(parameters),
    //   UserId: userId,
    // });

    // logger.info(`Create Action [${type}]`);

    if (response) {
      res.status(200).send(response);
    } else {
      res.status(404).send('No response');  
    }

    
  } catch (error) {
    res.status(404).send({ error });
    logger.info('Create Action Error');
  }
}

module.exports = {
  handle_action,
};
