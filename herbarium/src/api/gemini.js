import axios from 'axios';
import { encryptAES} from '../utils/aes'; // path may vary
import { fetchSessionKey } from '../utils/sessionKey'; // ✅ ADD THIS

export const getGeminiResponse = async (preInfo, prompt) => {
  const key = await fetchSessionKey();

  const encryptedPreInfo = encryptAES(preInfo, key);
  const encryptedPrompt = encryptAES(prompt, key);



  const response = await axios.post(
    `${import.meta.env.VITE_API_BASE_URL}/gemini`,
    {
      encryptedPreInfo,
      encryptedPrompt,
    },
    {
      withCredentials: true,
    }
  );

  return response.data.response;
};
