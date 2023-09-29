// https://651438388e505cebc2eaf596.mockapi.io/contacts
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { goItApi } from './auth/operations';

axios.defaults.baseURL = 'https://651438388e505cebc2eaf596.mockapi.io/';

export const fetchContactsThunk = createAsyncThunk(
  'fetchContacts',
  async (_, thunkAPI) => {
    try {
      const { data } = await goItApi.get('/contacts');
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const addContactThunk = createAsyncThunk(
  'addContact',
  async (contact, thunkAPI) => {
    try {
      const data = await goItApi.post('/contacts', contact);
      console.log(data.data);
      return data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue('Contact is exist');
    }
  }
);

export const deleteContactThunk = createAsyncThunk(
  'deleteContact',
  async (id, thunkAPI) => {
    try {
      await goItApi.delete(`/contacts/${id}`);
      return id;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);
