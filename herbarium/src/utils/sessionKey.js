let sessionKey = null;

export const fetchSessionKey = async () => {
  if (sessionKey) return sessionKey;

  try {
    const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/session/key`, {
      credentials: 'include',
    });

    const data = await res.json();


    sessionKey = data.key;
    return sessionKey;
  } catch (error) {
    console.error("❌ Error fetching session key:", error);
  }
};
