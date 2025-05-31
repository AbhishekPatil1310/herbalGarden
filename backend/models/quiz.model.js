// models/Quiz.js
import mongoose from 'mongoose';

const quizSchema = new mongoose.Schema({
  plant_id: { type: String, required: true }, // same as commonName
  questions: [
    {
      question: String,
      options: [String],
      answer: String,
      hint: String,
    },
  ],
});

const Quiz = mongoose.model('Quiz', quizSchema);

export default Quiz;
