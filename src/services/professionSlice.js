import { createSlice } from '@reduxjs/toolkit';

export const professionSlice = createSlice({
  name: 'profession',
  initialState: '',
  reducers: {
    setProfession: (state, action) => action.payload,
  },
});

export const { setProfession } = professionSlice.actions;

export default professionSlice.reducer;
