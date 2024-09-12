import { createSlice } from '@reduxjs/toolkit';
import { fetchUserDataByProfession } from './profession-thunk';


export const professionSlice = createSlice({
  name: 'profession',
  initialState: {
    profession: '',
    userData: {},
    status: 'idle', // Track the fetching status
    error: null,
  },
  reducers: {
    setProfession: (state, action) => {
      state.profession = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserDataByProfession.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUserDataByProfession.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.userData = action.payload;
      })
      .addCase(fetchUserDataByProfession.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export const { setProfession } = professionSlice.actions;

export default professionSlice.reducer;
