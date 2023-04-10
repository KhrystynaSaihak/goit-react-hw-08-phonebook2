import axios from 'axios';

import { createAsyncThunk } from '@reduxjs/toolkit';

axios.defaults.baseURL = 'https://connections-api.herokuapp.com/';

const setAuthHeader = token => {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};

const clearAuthHeader = () => {
  axios.defaults.headers.common.Authorization = '';
};
// SIGNUP
export const register = createAsyncThunk(
  'auth/register',
  async (credentials, thunkApi) => {
    try {
      const result = await axios.post('/users/signup', credentials);
      setAuthHeader(result.data.token);
      return result.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);
//LOGIN
export const logIn = createAsyncThunk(
  'auth/logIn',
  async (credentials, thunkAPI) => {
    try {
      const result = await axios.post('/users/login', credentials);
      setAuthHeader(result.data.token);
      return result.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
// LOGOUT
export const logOut = createAsyncThunk('auth/logOut', async (_, thunkAPI) => {
  try {
    await axios.post('/users/logout');
    clearAuthHeader();
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});
// REFRESH
export const fetchCurrentUser = createAsyncThunk(
  'auth/refresh',
  async (_, thunkAPI) => {
    const state = thunkAPI.getState();
    const persistedToken = state.auth.token;

    if (persistedToken === null) return thunkAPI.rejectWithValue();

    setAuthHeader(persistedToken);

    try {
      const { data } = await axios.get('/users/current');
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
