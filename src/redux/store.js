import { configureStore } from '@reduxjs/toolkit';
import { phoneBookReducer } from './slice';

export const store = configureStore({
  reducer: {
    phoneBook: phoneBookReducer,
  },
});
