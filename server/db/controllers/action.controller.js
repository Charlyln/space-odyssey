const logger = require('../../logger');
const { handleActions } = require('../../helper/actionhelper');

async function handle_action(req, res) {
  try {
    const response = await handleActions(req.body);

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
