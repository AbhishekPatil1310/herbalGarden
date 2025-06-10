// utils/gemini.js
import axios from 'axios';

const API_KEY = process.env.GEMINI_API_KEY;
const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`;

export async function getGeminiResponse(preInfo, prompt) {
  const fullPrompt = `Regarding the following plant information: ${preInfo}, answer the following question: ${prompt} within 100 words.`;

  const data = {
    contents: [{ parts: [{ text: fullPrompt }] }],
  };

  try {
    const response = await axios.post(url, data, {
      headers: { 'Content-Type': 'application/json' },
    });


    
    const reply = response.data.candidates?.[0]?.content?.parts?.[0]?.text;
    
    return reply || 'No meaningful response from Gemini';
  } catch (error) {
    console.error('Error:', error.response?.data || error.message);
    throw new Error('Failed to fetch response from Gemini');
  }
}

