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
        const errorMessage =
          error.response ? error.response.data : error.message;
        return thunkAPI.rejectWithValue(errorMessage);
      }
    });

export const googleLoginThunk = createAsyncThunk('users/googleLogin',
    async (tokenId, thunkAPI) => {
      try {
      // 调用一个服务来处理 Google 登录。
      // 这个服务需要接受一个 tokenId，并与 Google 的服务进行验证
        const loggedInUser = await userService.googleLogin({tokenId});
        return loggedInUser;
      } catch (error) {
      // 处理错误，可以向 reducer 发送一个错误 action，或者使用错误信息 reject promise
        // eslint-disable-next-line max-len
        const errorMessage = error.response ? error.response.data : error.message;
        return thunkAPI.rejectWithValue(errorMessage);
      }
    });

export const logoutThunk = createAsyncThunk('users/logout', async () => {
  await userService.logout();
});

export const deleteUserThunk = createAsyncThunk('users/deleteUser',
    async (userId) => {
      await userService.deleteUser(userId);
      return userId;
    },
);
