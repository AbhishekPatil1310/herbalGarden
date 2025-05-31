import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import connectDB from './db/index.js';
import appRouter from './routes/user.route.js';
import router from './routes/plant.route.js';
import quizRouter from './routes/quiz.route.js';

dotenv.config();

const app = express(); // initialize the express js
app.use(
  cors({
    origin: ['http://localhost:5173'],
    credentials: true,
  })
);
app.use(express.json());
// Middleware to parse incoming requests with URL-encoded payloads
app.use(cookieParser());
app.use('/api/v1', appRouter);
app.use('/api/v1', router);
app.use((req, res, next) => {
  const oldJson = res.json.bind(res);
  res.json = (...args) => {
    if (res.headersSent) {
      console.warn('WARNING: res.json called after headers were sent!');
      // return; // ✅ Don't send anything again!
    }
    return oldJson(...args);
  };
  next();
});

app.use('/api/v1', quizRouter);

connectDB()
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log('app is listening now');
    });
  })
  .catch((err) => {
    console.log(err, ': MongoDB connection Failed');
  });
