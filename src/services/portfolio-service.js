import axios from 'axios';

const API_BASE = process.env.API_BASE || 'http://localhost:4000/api/users';

export const registerUser = async (userData) => {
  try {
    const response = await axios.post(`${API_BASE}/register`, userData);
    return response.data;
  } catch (error) {
    console.error('Registration failed:', error);
    throw error;
  }
};

export const loginUser = async (credentials) => {
  try {
    const response = await axios.post(`${API_BASE}/login`, credentials);
    return response.data;
  } catch (error) {
    console.error('Login failed:', error);
    throw error;
  }
};
