const { v4: uuidv4 } = require('uuid');

const { User } = require('../models/user.model');
const { Ressource } = require('../models/ressource.model');
const { Building } = require('../models/building.model');
const { Battle } = require('../models/battle.model');
const { Mission } = require('../models/mission.model');
const { Info } = require('../models/info.model');
const { Research } = require('../models/research.model');
const { Spaceship } = require('../models/spaceship.model');
const { Planet } = require('../models/planet.model');

module.exports = {
  async update_building(req, res) {
    const { id } = req.params;

    const building = await Building.findOne({
      where: { id },
    });

    const user = await User.findOne({
      where: { id: building.UserId },
      order: [[{ model: Info }, 'createdAt', 'DESC']],
      include: [
        {
          model: Ressource,
        },
        {
          model: Building,
        },
        {
          model: Battle,
        },
        {
          model: Mission,
        },
        {
          model: Info,
          order: [['createdAt', 'ASC']],
        },
        {
          model: Research,
        },
        {
          model: Spaceship,
        },
        {
          model: Planet,
        },
      ],
    });

    await Promise.all(
      user.Ressources.map(async (ressource) => {
        if (ressource.name !== 'people') {
          ressource.update({ value: ressource.value - 30 * building.level });
        }
      }),
    );

    building.update({ upgrading: true });

    const infoId = uuidv4();

    const infoData = {
      id: infoId,
      message: `${building.name} start upgrade`,
      severity: 'info',
    };

    global.io.to(global.socketIds[user.id]).emit('info', {
      ...infoData,
    });

    await Info.create({
      ...infoData,
      UserId: user.id,
    });

    try {
      res.status(200).send(building);
    } catch (error) {
      res.status(404).send({ error });
    }
  },
};
