import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async thunk action to send form data to backend
export const sendFormData = createAsyncThunk(
  'form/sendFormData',
  async (formData, { rejectWithValue }) => {
    try {
      const formDataForUpload = new FormData();
      Object.keys(formData).forEach((key) => {
        if (formData[key] instanceof File) {
          formDataForUpload.append(key, formData[key]);
        } else if (typeof formData[key] === 'object' && formData[key] !== null) {
          Object.keys(formData[key]).forEach((subKey) => {
            formDataForUpload.append(`${key}[${subKey}]`, formData[key][subKey]);
          });
        } else {
          formDataForUpload.append(key, formData[key]);
        }
      });

      const response = await axios.post('YOUR_BACKEND_ENDPOINT', formDataForUpload, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

const initialState = {
  bio: '',
  resume: null,
  portfolioImage: null,
  linkedIn: '',
  email: '',
  behance: '',
  designPhilosophy: '',
  samplesOfWork: '',
  avatarUrl: '',
  scenario: {
    title: '',
    thumbnail: null,
    details: '',
    html: '',
    css: '',
    js: '',
  },
  softwareSimulation: {
    title: '',
    thumbnail: null,
    details: '',
    videoFile: null,
  },
  workFlow: {
    title: '',
    thumbnail: null,
    details: '',
    html: '',
    css: '',
    js: '',
  },
  quiz: {
    title: '',
    thumbnail: null,
    details: '',
    html: '',
    css: '',
    js: '',
  },
  status: 'idle',
  error: null,
};

const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    updateFormData(state, action) {
      return { ...state, ...action.payload };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendFormData.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(sendFormData.fulfilled, (state, action) => {
        state.status = 'succeeded';
      })
      .addCase(sendFormData.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export const { updateFormData } = formSlice.actions;

export default formSlice.reducer;
