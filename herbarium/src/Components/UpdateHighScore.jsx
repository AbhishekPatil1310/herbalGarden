import { useEffect } from 'react';
import axios from 'axios';
import { useQuiz } from '../context/quizContext';

const UpdateHighScore = () => {
  const { score } = useQuiz();

  useEffect(() => {
    const checkAndUpdateHighScore = async () => {
      try {
        const token = localStorage.getItem('token'); // Replace with your auth logic

        const res = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/highscore`,
          {
            withCredentials: true,
          }
        );

        const highScore = Number(res.data.highScore || 0);

        if (score > highScore) {
          await axios.post(
            `${import.meta.env.VITE_API_BASE_URL}/highscore`,
            { newScore: score },
            {
              withCredentials: true,
            }
          );
          console.log('New high score submitted:', score);
        }
      } catch (error) {
        console.error('High score update error:', error);
      }
    };

    if (score > 0) {
      checkAndUpdateHighScore();
    }
  }, [score]);

  return null; // This is a background-only component
};

export default UpdateHighScore;
