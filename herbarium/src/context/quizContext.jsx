// context/QuizContext.jsx
import { createContext, useContext, useState } from 'react';

const QuizContext = createContext();

export const QuizProvider = ({ children }) => {
  const [quizData, setQuizData] = useState([]);
  const [score, setScore] = useState(0);
  const [highscore,setHighScore] = useState(0)

  return (
    <QuizContext.Provider value={{ quizData, setQuizData, score, setScore,highscore,setHighScore }}>
      {children}
    </QuizContext.Provider>
  );
};

export const useQuiz = () => useContext(QuizContext);
