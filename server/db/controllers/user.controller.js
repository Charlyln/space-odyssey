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
      res.status(200).send(user);
    } catch (error) {
      res.status(404).send({ error });
    }
  },
  async create_user(req, res) {
    const user = await User.create({
      id: uuidv4(),
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

    try {
      res.status(200).send(user);
    } catch (error) {
      res.status(404).send({ error });
    }
  },
};
