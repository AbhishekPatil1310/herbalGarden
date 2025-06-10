import CryptoJS from 'crypto-js';
import { getGeminiResponse as fetchGeminiResponse } from '../util/geminiback.js';

// ✅ CryptoJS-compatible decryption
const decryptAES = (data, keyHex) => {
  const key = CryptoJS.enc.Hex.parse(keyHex);
  const iv = CryptoJS.enc.Hex.parse(data.iv);
  const ciphertext = CryptoJS.enc.Hex.parse(data.content);

  const encrypted = CryptoJS.lib.CipherParams.create({
    ciphertext,
    iv,
    key,
    algorithm: CryptoJS.algo.AES,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  });

  const decrypted = CryptoJS.AES.decrypt(encrypted, key, {
    iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  });

  return decrypted.toString(CryptoJS.enc.Utf8);
};

export const getGeminiResponse = async (req, res) => {
  const sessionKey = req.session.aesKey;
  if (!sessionKey) {
    return res.status(401).json({ error: 'Session key not found' });
  }

  const { encryptedPreInfo, encryptedPrompt } = req.body;

  try {
    const preInfo = decryptAES(encryptedPreInfo, sessionKey);
    const prompt = decryptAES(encryptedPrompt, sessionKey);
    const response = await fetchGeminiResponse(preInfo, prompt);

    res.status(200).json({ response });
  } catch (err) {
    console.error('❌ Decryption or Gemini API error:', err);
    res.status(500).json({ error: 'Decryption or Gemini API error' });
  }

  // Optional: Debug logs (don't use in production)

};
