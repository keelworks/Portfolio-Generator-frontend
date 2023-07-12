import {createSlice} from '@reduxjs/toolkit';
import {
  loginThunk,
  registerThunk,
} from '../services/authorize-thunk';

const authorizeSlice = createSlice({
  name: 'authorize',
  initialState: {user: null},
  reducers: {},
  extraReducers: (builder) => {
    builder
        .addCase(loginThunk.fulfilled, (state, action) => {
          state.user = action.payload;
        })
        .addCase(loginThunk.rejected, (state, action) => {
          state.error = action.payload;
        })
        .addCase(registerThunk.fulfilled, (state, {payload}) => {
        })
    ;
  },
});

export default authorizeSlice.reducer;
