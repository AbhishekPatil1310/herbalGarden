// api/quiz.js
import axios from 'axios';

export const fetchQuizByPlant = async () => {
  console.log('📤 Sending request to /quiz');

  const response = await axios.get(
    `${import.meta.env.VITE_API_BASE_URL}/quiz`,
    {
      withCredentials: true, // Include cookies/session
    }
  );

  return response.data;
};

export const highScore = async () =>{
  console.log(`sending request to user...`);
  const res =await axios.get(
    `${import.meta.VITE_API_BASE_URL}/`
  )
}