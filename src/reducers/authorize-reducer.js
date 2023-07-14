import {createSlice} from '@reduxjs/toolkit';
import {
  deleteUserThunk,
  loginThunk, logoutThunk,
  registerThunk,
} from '../services/authorize-thunk';

const authorizeSlice = createSlice({
  name: 'authorize',
  initialState: null,
  reducers: {},
  extraReducers: (builder) => {
    builder
        .addCase(loginThunk.fulfilled, (state, action) => {
          return action.payload;
        })
        .addCase(loginThunk.rejected, (state, action) => {
          return {error: action.payload};
        })
        .addCase(logoutThunk.fulfilled, (state) => {
          return null;
        })
        .addCase(registerThunk.fulfilled, (state, {payload}) => {
        })
        .addCase(deleteUserThunk.fulfilled, (state) => {
          return null;
        })
        .addCase(deleteUserThunk.rejected, (state, action) => {
        // Handle error here
          console.error('Delete user failed:', action.error);
        })
    ;
  },
});

export default authorizeSlice.reducer;
