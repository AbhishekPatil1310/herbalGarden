// routes/gemini.route.js
import express from 'express';
import { getGeminiResponse } from '../controllers/gemini.controller.js';

const geminiRouter = express.Router();

geminiRouter.post('/gemini', getGeminiResponse);

export default geminiRouter;
