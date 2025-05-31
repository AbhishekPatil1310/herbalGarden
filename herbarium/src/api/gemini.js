// gemini.js
import axios from 'axios';

const API_KEY = import.meta.env.VITE_API_KEY;
const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`;

export async function getGeminiResponse(preInfo, prompt) {
  // let limit = " give response under 100 words";
  let fullPrompt = `Regarding the follwing plant information ${preInfo}, Answer the ${prompt} within 100 words`;

  // console.log(prompt);
  const data = {
    contents: [{ parts: [{ text: fullPrompt }] }],
  };

  try {
    const response = await axios.post(url, data, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const reply = response.data.candidates?.[0]?.content?.parts?.[0]?.text;
    return reply || 'No response from Gemini';
  } catch (error) {
    console.error(
      'Error:',
      error.response ? error.response.data : error.message
    );
    return 'Error occurred while fetching response';
  }
}
