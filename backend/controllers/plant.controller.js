// plant.controller.js

import Cube from '../models/plant.model.js'; // Assuming you move schema to a model file

// Get plant by Cube name
export const getPlantByCubeName = async (req, res) => {
  try {

    const cube = await Cube.findOne({ Cube: req.params.name});

    if (!cube) {
      return res.status(404).json({ message: 'Plant not found' });
    }

    res.status(200).json(cube);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
