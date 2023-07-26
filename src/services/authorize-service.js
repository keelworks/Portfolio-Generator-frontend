import axios from 'axios';

const API_BASE = process.env.REACT_APP_APIENDPOINT || 'http://localhost:4000/api/users';

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

/**
 * Login.
 *
 * @return {any} - login
 */
export const loginUser = async ({username, password}) => {
  try {
    const response = await api.post(`${API_BASE}/login`, {username, password});
    return response.data;
  } catch (error) {
    // console.error('Login failed:', error);
    if (error.response && error.response.status === 403) {
      throw new Error('User does not exist');
    }
    throw error;
  }
};

export const googleLogin = async ({tokenId}) => {
  try {
    // 请注意，我这里假设你的后端已经准备好处理一个新的 `/google-login` 请求
    // 这个请求需要接收一个 tokenId，并使用它来完成 Google 登录的验证流程
    const response = await api.post(`${API_BASE}/google-login`, {tokenId});
    return response.data;
  } catch (error) {
    // 根据需要处理错误
    if (error.response && error.response.status === 403) {
      throw new Error('User does not exist');
    }
    throw error;
  }
};

export const logout = async () => {
  const response = await api.post(`${API_BASE}/logout`);
  return response.data;
};

export const deleteUser = async (uid) => {
  const response = await api.delete(`${API_BASE}/${uid}`);
  return response.data;
};
