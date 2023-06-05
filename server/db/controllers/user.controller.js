const { v4: uuidv4 } = require('uuid');

const { User } = require('../models/user.model');
const { Ressource } = require('../models/ressource.model');
const { Building } = require('../models/building.model');

module.exports = {
  async get_user(req, res) {
    const { id } = req.params;
    const user = await User.findOne({
      where: { id },
      include: [
        {
          model: Ressource,
        },
        {
          model: Building,
        },
      ],
    });

    try {
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
          const user = await User.create({
            id: uuidv4(),
            name,
          });

          await Building.create({
            id: uuidv4(),
            name: 'Steel mine',
            type: 'mine',
            UserId: user.id,
          });

          await Building.create({
            id: uuidv4(),
            name: 'Gold mine',
            type: 'mine',
            UserId: user.id,
          });

          await Ressource.create({
            id: uuidv4(),
            name: 'steel',
            value: 30,
            UserId: user.id,
          });

          await Ressource.create({
            id: uuidv4(),
            name: 'gold',
            value: 0,
            UserId: user.id,
          });

          await Ressource.create({
            id: uuidv4(),
            name: 'people',
            value: 10,
            UserId: user.id,
          });

          await Ressource.create({
            id: uuidv4(),
            name: 'spaceship',
            value: 1,
            UserId: user.id,
          });

          await Ressource.create({
            id: uuidv4(),
            name: 'food',
            value: 10,
            UserId: user.id,
          });

          await Ressource.create({
            id: uuidv4(),
            name: 'energy',
            value: 100,
            UserId: user.id,
          });

          await Ressource.create({
            id: uuidv4(),
            name: 'plutonium',
            value: 0,
            UserId: user.id,
          });

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
