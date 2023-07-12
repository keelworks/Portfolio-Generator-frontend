import {createAsyncThunk} from '@reduxjs/toolkit';
import * as userService from './authorize-service';

export const registerThunk = createAsyncThunk('users/register',
    async (user) => {
      return await userService.registerUser(user);
    });

export const loginThunk = createAsyncThunk('users/login',
    async (credentials, thunkAPI) => {
      try {
        const loggedInUser = await userService.loginUser(credentials);
        return loggedInUser;
      } catch (error) {
      // You can dispatch an error action here,
      // or reject the promise with error message
        return thunkAPI.rejectWithValue(error.message);
      }
    });
