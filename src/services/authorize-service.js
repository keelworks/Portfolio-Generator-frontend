import axios from 'axios';

const API_BASE = process.env.REACT_APP_APIENDPOINT ||
'https://portfolio-generator-7s61.onrender.com/api/users';

const api = axios.create({
  withCredentials: true,
});

export const registerUser = async (userData) => {
  try {
    const response = await api.post(`${API_BASE}/register`, userData);
    return response.data;
  } catch (error) {
    console.error('Registration failed:', error);
    throw error;
  }
};

export const loginUser = async ({username, password}) => {
  try {
    const response = await api.post(`${API_BASE}/login`, {username, password});
    return response.data;
  } catch (error) {
    console.error('Login failed:', error);
    throw error;
  }
};
