import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_BASE_URL;
const LOREM_IPSUM_API = import.meta.env.VITE_LOREM_IPSUM_API;
const LOREM_IPSUM_API_KEY = import.meta.env.VITE_LOREM_IPSUM_API_KEY;


export const login = (credentials) => axios.post(`${API_BASE}/auth/login`, credentials);

export const logout = () => Promise.resolve(); // Placeholder for token removal if needed
// Register function to send user data to backend
export const register = (credentials) => {
  return axios.post(`${API_BASE}/auth/register`, credentials);
};

/**
 * Fetch user data (profile and progress) from the backend.
 * @param {string} token - The JWT token for authorization.
 * @returns {Promise<object>} - A promise that resolves to the user's data.
 * @throws {Error} - Throws an error if the fetch operation fails.
 */
export const fetchUserData = async (token) => {
  if (!token) {
    throw new Error('No authentication token found');
  }

  try {
    const response = await axios.get(`${API_BASE}/user/profile`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data; // Return actual data
  } catch (error) {
    throw new Error('Failed to fetch user data');
  }
};

export const fetchProgress = async (token) => {
  if (!token) {
    throw new Error('No authentication token found');
  }

  try {
    const response = await axios.get(`${API_BASE}/typing-progress`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data; // Return actual data
  } catch (error) {
    throw new Error('Failed to fetch progress');
  }
};


/**
 * Handle account deletion by making a POST request.
 * @param {Object} deleteCredentials - The email and password for account deletion.
 * @param {string} token - The JWT token for authorization.
 * @returns {Promise} - Resolves if the account is successfully deleted.
 * @throws {Error} - Throws an error if deletion fails.
 */
export const handleDeleteAccount = async (deleteCredentials, token) => {
  if (!token) {
    throw new Error('No authentication token found');
  }

  try {
    const response = await axios.post(
      `${API_BASE}/user/delete`,
      deleteCredentials,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`, // Include JWT token
        },
        withCredentials: true, // Include cookies for session-based auth
      }
    );
    return response.data; // Return response data
  } catch (error) {
    throw new Error(error.response?.data || 'Failed to delete account');
  }
};


/**
 * Sends an OTP to the user's registered email for password reset.
 * @param {string} email - The user's email address.
 * @returns {Promise} - Resolves when the OTP is sent successfully.
 * @throws {Error} - Throws an error if the OTP request fails.
 */
export const forgotPassword = async (email) => {
  try {
    const response = await axios.post(`${API_BASE}/auth/forgot-password`, { email });
    return response.data; // Return response data (e.g., success message)
  } catch (error) {
    throw new Error(error.response?.data || 'Failed to send OTP');
  }
};

/**
 * Resets the user's password using the provided email, OTP, and new password.
 * @param {Object} data - The email, OTP, and new password.
 * @returns {Promise} - Resolves when the password is reset successfully.
 * @throws {Error} - Throws an error if the password reset fails.
 */
export const resetPassword = async (data) => {
  try {
    const response = await axios.post(`${API_BASE}/auth/reset-password`, data);
    return response.data; // Return response data (e.g., success message)
  } catch (error) {
    throw new Error(error.response?.data || 'Failed to reset password');
  }
};


// Import necessary modules (if needed, e.g., axios for more advanced handling)
// For simplicity, using fetch directly here

/**
 * Fetches a Lorem Ipsum text from the API.
 * @returns {Promise<string|null>} The fetched Lorem Ipsum text or null in case of an error.
 */
export const fetchLoremText = async () => {
  try {
    const response = await fetch(`${LOREM_IPSUM_API}`, {
      method: 'GET',
      headers: { 'X-Api-Key':`${LOREM_IPSUM_API_KEY}` },
    });

    const data = await response.json();

    if (data && data.text) {
      return data.text; // Return the fetched text
    } else {
      console.error('Expected "text" field in response not found');
      return null;
    }
  } catch (error) {
    console.error('Error fetching text:', error.message);
    return null;
  }
};

/**
 * Saves typing progress to the backend.
 * @param {Object} progressData - The progress data to save.
 * @param {number} progressData.speed - The typing speed.
 * @param {number} progressData.accuracy - The typing accuracy.
 * @param {number} progressData.wordsTyped - The number of words typed.
 * @returns {Promise<Object|null>} The result from the backend or null in case of an error.
 */
export const saveProgressToBackend = async (progressData) => {
  try {
    const token = localStorage.getItem('token');

    const response = await fetch(`${API_BASE}/typing-progress`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(progressData),
    });

    if (response.ok) {
      const result = await response.json();
      console.log('Progress saved successfully:', result);
      return result; // Return the result from the backend
    } else {
      const errorText = await response.text(); // Parse plain text errors
      console.error('Error saving progress:', errorText);
      return null;
    }
  } catch (error) {
    console.error('Error making request:', error.message);
    return null;
  }
};