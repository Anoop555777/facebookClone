import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: [],
    success: '',
    loading: false,
    error: false,
  },
  reducers: {
    userRegisterRequest(state) {
      state.loading = true;
    },
    userRegisterSuccess(state, action) {
      state.loading = false;
      state.user = [action.payload.user];
      state.error = null;
      state.success = action.payload.status;
    },
    userRegisterFail(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    userLoginRequest(state) {
      state.loading = true;
    },
    userLoginSuccess(state, action) {
      state.loading = false;
      state.user = [action.payload.user];
      state.success = 'success';

      state.error = false;
    },
    userLoginFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    userLogoutFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    userLogoutRequest(state, action) {
      state.loading = true;
    },
    userLogoutSuccess(state, action) {
      state.loading = false;
      state.user = [];
      state.error = false;
    },
    isLoggedIn(state, action) {
      state.user = action.payload.user;
    },

    updateMeRequest(state) {
      state.loading = true;
    },
    updateMeFail(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    updateMeSuccess(state, action) {
      state.user = action.payload.user;
      state.error = null;
      state.success = true;
      state.loading = false;
    },
    userReset(state) {
      state.loading = false;
      state.error = false;
      state.success = false;
      state.user = [];
    },
    userVerified(state) {
      state.user[0].verified = true;
    },
  },
});

export const userActions = userSlice.actions;
export default userSlice.reducer;
