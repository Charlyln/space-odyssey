const { User } = require('../models/user.model');
const { Planet } = require('../models/planet.model');
const { System } = require('../models/system.model');

const { getUserData, createUserData, getServerData, createDefaultMissions } = require('../../helper/model.helper');

module.exports = {
  async get_user(req, res) {
    const { id } = req.params;
    try {
      const user = await getUserData(id);

      if (user) {
        res.status(200).send(user);
      } else {
        res.status(200).send('User not find');
      }
    } catch (error) {
      res.status(404).send({ error });
    }
  },

  async get_serverData(req, res) {
    try {
      const serverData = await getServerData();

      if (serverData) {
        res.status(200).send(serverData);
      } else {
        res.status(404).send('Data not find');
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

        const baseSystem = await System.findOne({
          where: { name: 'Alpha A' },
          include: [
            {
              model: Planet,
              separate: true,
            },
          ],
        });

        const basePlanet = baseSystem.Planets[0];

        if (!userFind) {
          const user = await createUserData(name, basePlanet.id);
          await createDefaultMissions(user.id);
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
