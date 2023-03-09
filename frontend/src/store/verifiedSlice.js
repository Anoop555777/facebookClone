import { createSlice } from '@reduxjs/toolkit';

const verifiedSlice = createSlice({
  name: 'verified',
  initialState: {
    verified: false,
    error: false,
    loading: false,
  },
  reducers: {
    verifiedSuccess(state, action) {
      state.verified = action.payload.verified;
    },
    verifiedFail(state, action) {
      state.error = action.payload;
    },
  },
});

export const verifiedAction = verifiedSlice.actions;

export default verifiedSlice.reducer;
