const { Building } = require('../models/building.model');

module.exports = {
  async update_building(req, res) {
    const { id } = req.params;

    const building = await Building.findOne({
      where: { id },
    });

    building.update({ upgrading: true });

    console.log(building);

    try {
      res.status(200).send(building);
    } catch (error) {
      res.status(404).send({ error });
    }
  },
};
