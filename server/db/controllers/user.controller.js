const { User } = require('../models/user.model');

const { getUserData, createUserData } = require('../../helper/userhelper');

module.exports = {
  async get_user(req, res) {
    const { id } = req.params;
    try {
      const user = await getUserData(id);

      if (user) {
        res.status(200).send(user);
      } else {
        res.status(404).send('User not find');
      }
    } catch (error) {
      res.status(404).send({ error });
    }
  },
  async create_user(req, res) {
    const { name } = req.body;

    try {
      if (name) {
        const userFind = await User.findOne({
          where: { name },
        });

        if (!userFind) {
          const user = await createUserData(name);
          res.status(200).send(user);
        } else {
          res.status(404).send('Name already taken');
        }
      } else {
        res.status(404).send('Please enter a name');
      }
    } catch (error) {
      res.status(404).send({ error });
    }
  },
};
