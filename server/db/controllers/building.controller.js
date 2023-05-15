const { v4: uuidv4 } = require('uuid');

const { Building } = require('../models/building.model');
const { Info } = require('../models/info.model');

const { getUserData } = require('../../helper/userhelper');

module.exports = {
  async update_building(req, res) {
    const { id } = req.params;

    const building = await Building.findOne({
      where: { id },
    });

    const user = await getUserData(building.UserId);

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
