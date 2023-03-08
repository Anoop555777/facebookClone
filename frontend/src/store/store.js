import { composeWithDevTools } from 'redux-devtools-extension';
import { configureStore } from '@reduxjs/toolkit';
import userSlice from './userSlice';
const store = configureStore(
  {
    reducer: {
      user: userSlice,
    },
  },
  composeWithDevTools()
);

export default store;
