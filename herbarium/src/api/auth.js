export const loginUser = async ({ email, password }) => {
  const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
    credentials: 'include',
  });

  if (!res.ok) throw new Error((await res.json()).message || 'Login failed');
  return res.json();
};

export const registerUser = async ({ fullName, email, password }) => {
  const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ fullName, email, password }),
    credentials: 'include',
  });

  const data = await res.json();

  if (!res.ok) {
    // Include status code in the error object
    const error = new Error(data.message || 'Signup failed');
    error.status = res.status;
    throw error;
  }

  return data;
};

export const logoutUser = async () => {
  const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/logout`, {
    method: 'POST',
    credentials: 'include', // Ensure cookies are included
  });

  if (!res.ok) throw new Error((await res.json()).message || 'Logout failed');
  return res.json();
};

// check whether user is authenticated or not
export const fetchAuthenticatedUser = async () => {
  const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/me`, {
    credentials: 'include', // so cookies are sent!
  });

  if (res.status === 401) {
    // Try to refresh the token
    const refreshed = await fetch(
      `${import.meta.env.VITE_API_BASE_URL}/refresh-token`,
      {
        method: 'POST',
        credentials: 'include',
      }
    );
    if (refreshed.ok) {
      // Try the original request again after refreshing
      const retryRes = await fetch(`${import.meta.env.VITE_API_BASE_URL}/me`, {
        credentials: 'include',
      });

      if (!retryRes.ok) throw new Error('Unable to fetch user after refresh');
      return await retryRes.json();
    } else {
      throw new Error('Refresh token expired');
    }
  }

  if (!res.ok) throw new Error('Unauthorized');
  return res.json();
};

// Track plant visit
export const trackPlantVisit = async (cubeName) => {
  const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/track-visit`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include', // Important for cookies
    body: JSON.stringify({ cubeName }),
  });

  const data = await res.json();

  if (!res.ok) {
    const error = new Error(data.message || 'Failed to track plant visit');
    error.status = res.status;
    throw error;
  }

  return data;
};
