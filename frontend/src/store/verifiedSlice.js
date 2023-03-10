import { createSlice } from '@reduxjs/toolkit';

const verifiedSlice = createSlice({
  name: 'verified',
  initialState: {
    verified: false,
    error: '',
    loading: false,
  },
  reducers: {
    verifiedSuccess(state, action) {
      state.verified = action.payload.verified;
      state.error = '';
    },
    verifiedFail(state, action) {
      state.error = action.payload;
    },
  },
});

export const verifiedAction = verifiedSlice.actions;

export default verifiedSlice.reducer;
