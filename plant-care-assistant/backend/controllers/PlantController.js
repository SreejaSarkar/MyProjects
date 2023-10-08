const PlantModel = require("../models/Plant")

module.exports.getAll = async (req, res) => {
    try {
      const plants = await PlantModel.find(); 
      res.send(plants);
    } catch (error) {
      console.error(error);
      res.status(500).send({ error: 'Internal Server Error' });
    }
  };

  module.exports.getById = async (req, res) => {
    const {id} = req.params;
    try{
    const plant = await PlantModel.findById(id);
    if (!plant) {
      return res.status(404).json({ message: 'Plant not found' });
    }
    res.json(plant);
    }  catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

