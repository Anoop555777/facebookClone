import { composeWithDevTools } from 'redux-devtools-extension';
import { configureStore } from '@reduxjs/toolkit';
import userSlice from './userSlice';
import verifiedSlice from './verifiedSlice';
const store = configureStore(
  {
    reducer: {
      user: userSlice,
      verified: verifiedSlice,
    },
  },
  composeWithDevTools()
);

export default store;
