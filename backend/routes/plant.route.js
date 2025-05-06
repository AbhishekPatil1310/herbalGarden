// plant.route.js

import express from 'express';
import { getPlantByCubeName } from '../controllers/plant.controller.js';

const router = express.Router();

router.get('/cube/:name', getPlantByCubeName);

export default router;
