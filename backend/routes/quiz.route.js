// routes/quiz.js
import express from 'express';
import {
  getQuizQuestions,
  insertBulkQuizData,
} from '../controllers/quiz.controller.js';
import { verifyJWT } from '../middlewares/auth.middleware.js';
const quizRouter = express.Router();

quizRouter.get('/quiz', verifyJWT, getQuizQuestions);
quizRouter.post('/insert-question', insertBulkQuizData);

export default quizRouter;
