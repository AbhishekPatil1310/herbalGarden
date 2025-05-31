// controllers/quiz.controller.js
import Quiz from '../models/quiz.model.js';
import { getGeminiQuiz } from './geminiUtils.js';

export const getQuizQuestions = async (req, res) => {
  try {
    const user = req.user;
    if (!user) {
      return res.status(401).json({ error: 'User not authenticated' });
    }

    const visited = user.visitedPlants || [];
    if (!visited.length) {
      const randomQuestions = await Quiz.aggregate([
        { $unwind: '$questions' },
        { $sample: { size: 10 } },
        { $replaceRoot: { newRoot: '$questions' } },
      ]);
      return res.json(randomQuestions);
    }

    const totalVisits = visited.reduce((sum, p) => sum + p.visitCount, 0);
    const quizQuestions = [];

    for (const plant of visited) {
      const weight = Math.round((plant.visitCount / totalVisits) * 10);
      if (weight === 0) continue;

      try {
        let quiz = await Quiz.findOne({ plant_id: plant.plant_id });

        if (!quiz) {
          const generated = await getGeminiQuiz(plant.plant_id);
          quiz = new Quiz({ plant_id: plant.plant_id, questions: generated });
          await quiz.save();
        }

        const shuffled = [...quiz.questions].sort(() => 0.5 - Math.random());
        quizQuestions.push(...shuffled.slice(0, weight));
      } catch (innerErr) {
        console.error(
          `Error handling quiz for plant "${plant.plant_id}":`,
          innerErr.message
        );
        // Skip this plant but continue with others
        continue;
      }
    }

    // If we didn't get any questions, try fallback to random questions
    if (quizQuestions.length === 0) {
      const randomQuestions = await Quiz.aggregate([
        { $unwind: '$questions' },
        { $sample: { size: 10 } },
        { $replaceRoot: { newRoot: '$questions' } },
      ]);
      return res.json(randomQuestions);
    }

    const finalQuestions = quizQuestions
      .sort(() => 0.5 - Math.random())
      .slice(0, 10);

    return res.json(finalQuestions);
  } catch (error) {
    console.error('Error in quiz API:', error);
    // Only send response if not already sent
    if (!res.headersSent) {
      return res.status(500).json({ error: 'Failed to get quiz questions' });
    }
  }
};
// controllers/quizController.js

export const insertBulkQuizData = async (req, res) => {
  try {
    const quizData = [
      {
        plant_id: 'Cardamom',
        questions: [
          {
            question:
              'What part of the cardamom plant is commonly used as a spice?',
            options: ['Root', 'Leaf', 'Seed', 'Flower'],
            answer: 'Seed',
            hint: 'It’s the small pod inside the fruit.',
          },
          {
            question: 'What climate does cardamom grow best in?',
            options: ['Arid', 'Temperate', 'Tropical', 'Cold'],
            answer: 'Tropical',
            hint: 'Think rainforests.',
          },
        ],
      },
      {
        plant_id: 'Turmeric',
        questions: [
          {
            question: 'What is the primary active compound in turmeric?',
            options: ['Curcumin', 'Capsaicin', 'Menthol', 'Allicin'],
            answer: 'Curcumin',
            hint: 'It gives turmeric its yellow color.',
          },
          {
            question:
              'Which part of the turmeric plant is used for medicinal purposes?',
            options: ['Leaf', 'Root', 'Flower', 'Seed'],
            answer: 'Root',
            hint: 'It’s a rhizome, much like ginger.',
          },
        ],
      },
      {
        plant_id: 'Tulsi',
        questions: [
          {
            question: 'Which property is Tulsi most known for?',
            options: ['Cooling', 'Sedative', 'Antibacterial', 'Spicy'],
            answer: 'Antibacterial',
            hint: 'It’s often used in immunity-boosting remedies.',
          },
          {
            question: 'What is another common name for Tulsi?',
            options: ['Holy Basil', 'Lemongrass', 'Neem', 'Sage'],
            answer: 'Holy Basil',
            hint: 'It is considered sacred in many Indian homes.',
          },
        ],
      },
    ];

    // Insert all at once
    const result = await Quiz.insertMany(quizData, { ordered: false });

    res.status(201).json({
      status: true,
      message: 'Bulk quiz data inserted successfully',
      insertedCount: result.length,
    });
  } catch (error) {
    console.error('Error inserting bulk quiz data:', error.message);
    res.status(500).json({
      status: false,
      message: 'Server error while inserting quiz data',
    });
  }
};
