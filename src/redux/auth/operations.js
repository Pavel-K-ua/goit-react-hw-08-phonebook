import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const goItApi = axios.create({
  baseURL: 'https://connections-api.herokuapp.com/',
});
const setToken = token => {
  goItApi.defaults.headers.common.Authorization = `Bearer ${token}`;
};
const clearToken = () => {
  goItApi.defaults.headers.common.Authorization = ``;
};

export const registerThunk = createAsyncThunk(
  'register',
  async (credentials, thunkApi) => {
    try {
      const { data } = await goItApi.post('/users/signup', credentials);
      setToken(data.token);
      return data;
    } catch (error) {
      console.log(error.message.errors.message);
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const loginThunk = createAsyncThunk(
  'login',
  async (credentials, { rejectWithValue }) => {
    try {
      const { data } = await goItApi.post('/users/login', credentials);
      setToken(data.token);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const logoutThunk = createAsyncThunk(
  'logout',
  async (_, { rejectWithValue }) => {
    try {
      await goItApi.post('/users/logout');
      clearToken();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
export const refreshThunk = createAsyncThunk(
  'refresh',
  async (_, { rejectWithValue, getState }) => {
    const savedToken = getState().auth.token;
    if (!savedToken) {
      return rejectWithValue('Token is not exist');
    }
    try {
      setToken(savedToken);
      const { data } = await goItApi.get('users/current');
      console.log(data);
      return data;
    } catch (error) {}
  }
);
