// models/plant.model.js

import mongoose from 'mongoose';

const cubeSchema = new mongoose.Schema({
  Cube: String,
  CommonName: String,
  ScientificName: String,
  Uses: String,
  EnvironmentNeededForCultivation: String
});

const Cube = mongoose.model('Cube', cubeSchema);

export default Cube;
