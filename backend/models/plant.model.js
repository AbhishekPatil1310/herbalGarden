// models/plant.model.js

import mongoose from 'mongoose';

const cubeSchema = new mongoose.Schema({
  Cube: String,
  CommonName : String,
  Family: String,
  scientificName: String,
  Collector: String,
  Country: String,
  Uses: String,
});

const Cube = mongoose.model('Cube', cubeSchema);

export default Cube;
