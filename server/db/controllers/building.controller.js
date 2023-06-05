const { User } = require('../models/user.model');
const { Ressource } = require('../models/ressource.model');
const { Building } = require('../models/building.model');
const { v4: uuidv4 } = require('uuid');

module.exports = {
  async update_building(req, res) {
    const { id } = req.params;

    const building = await Building.findOne({
      where: { id },
    });

    const user = await User.findOne({
      where: { id: building.UserId },
      include: [
        {
          model: Ressource,
        },
        {
          model: Building,
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

    global.io.emit('info', {
      id: uuidv4(),
      message: `${building.name} start upgrade`,
      severity: 'info',
    });

    try {
      res.status(200).send(building);
    } catch (error) {
      res.status(404).send({ error });
    }
  },
};
