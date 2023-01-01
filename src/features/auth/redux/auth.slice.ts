import { createSlice } from '@reduxjs/toolkit';

import { authApi } from './auth.api';

interface AuthState {
  isAuthenticated: boolean;
  accessToken: string | null;
  refreshToken: string | null;
}

const initialState: AuthState = {
  isAuthenticated: false,
  accessToken: null,
  refreshToken: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  extraReducers: builder => {
    builder.addMatcher(
      authApi.endpoints.login.matchFulfilled,
      (state, { payload }) => {
        state.isAuthenticated = true;
        state.accessToken = payload.accessToken;
        state.refreshToken = payload.refreshToken;
      },
    );
    builder.addMatcher(
      authApi.endpoints.refreshToken.matchFulfilled,
      (state, { payload }) => {
        state.accessToken = payload.accessToken;
        state.refreshToken = payload.refreshToken;
      },
    );
    builder.addMatcher(authApi.endpoints.logout.matchFulfilled, state => {
      state.isAuthenticated = false;
      state.accessToken = null;
      state.refreshToken = null;
    });
  },
  reducers: {},
});

export const authActions = authSlice.actions;
export const authReducer = authSlice.reducer;
