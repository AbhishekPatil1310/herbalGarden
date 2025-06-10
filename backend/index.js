import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import session from 'express-session';

import connectDB from './db/index.js';
import appRouter from './routes/user.route.js';
import router from './routes/plant.route.js';
import quizRouter from './routes/quiz.route.js';
import geminiRouter from './routes/gemini.route.js';
import sessionRouter from './routes/session.route.js'; // ✅ NEW

dotenv.config();

const app = express(); // Initialize Express

// CORS Configuration
app.use(
  cors({
    origin: ['http://localhost:5173'],
    credentials: true,
  })
);

// JSON & Cookie Parsing Middleware
app.use(express.json());
app.use(cookieParser());

// ✅ SESSION SETUP (Required for AES session key storage)
app.use(
  session({
    secret: process.env.SESSION_SECRET || 'your-default-secret',
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false, // Set to true in production with HTTPS
      httpOnly: true,
      sameSite: 'lax',
    },
  })
);

// ✅ Routes
app.use('/api/v1', appRouter);
app.use('/api/v1', router);
app.use('/api/v1', geminiRouter);
app.use('/api/v1', sessionRouter); // ✅ NEW route for fetching AES key
app.use('/api/v1', quizRouter);

// Prevent double response
app.use((req, res, next) => {
  const oldJson = res.json.bind(res);
  res.json = (...args) => {
    if (res.headersSent) {
      console.warn('WARNING: res.json called after headers were sent!');
      return;
    }
    return oldJson(...args);
  };
  next();
});

// Start the server
connectDB()
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`✅ Server is running on port ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.error('❌ MongoDB connection failed:', err);
  });
