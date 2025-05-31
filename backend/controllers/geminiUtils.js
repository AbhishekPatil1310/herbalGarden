// utils/geminiUtils.js
import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

/**
 * Sends a prompt to Gemini API and returns the plain text response.
 * @param {string} preInfo - Optional context.
 * @param {string} prompt - The main prompt to ask.
 * @returns {Promise<string>} - The AI's text response.
 */
export const getGeminiResponse = async (preInfo, prompt) => {
  const combinedPrompt = preInfo ? `${preInfo}\n\n${prompt}` : prompt;

  const response = await axios.post(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
    {
      contents: [{ parts: [{ text: combinedPrompt }] }],
    },
    {
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );

  const text = response?.data?.candidates?.[0]?.content?.parts?.[0]?.text || '';
  return text.trim();
};

export const getGeminiQuiz = async (plantId) => {
  const prompt = `
Generate 5 quiz questions about the medicinal plant "${plantId}".
Each should include:
- question (text)
- 4 options (array)
- answer (one of the options)
- hint (short string)

Return ONLY JSON array in this format:
[
  {
    "question": "...",
    "options": ["...", "...", "...", "..."],
    "answer": "...",
    "hint": "..."
  },
  ...
]
`;

  try {
    const responseText = await getGeminiResponse('', prompt);

    if (!responseText) {
      throw new Error('No response text returned by Gemini');
    }

    const cleaned = responseText
      .trim()
      .replace(/^```json/, '')
      .replace(/^```/, '')
      .replace(/```$/, '')
      .trim();

    const parsed = JSON.parse(cleaned);

    if (!Array.isArray(parsed)) {
      throw new Error('Parsed content is not an array');
    }

    return parsed;
  } catch (err) {
    console.error('❌ Error parsing Gemini quiz response:', err.message);
    throw new Error('AI did not return valid JSON');
  }
};
