import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_BASE = process.env.REACT_APP_APIENDPOINT || 'http://localhost:4000/api';

// Setup API with axios for handling requests
const api = axios.create({
  withCredentials: true,
});

// Thunk for fetching user data based on the profession
export const fetchUserDataByProfession = createAsyncThunk(
  'profession/fetchUserDataByProfession',
  async (profession, { rejectWithValue }) => {
    try {
      const response = await api.get(`${API_BASE}/users/byProfession/${profession}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response ? error.response.data : error.message);
    }
  },
);
