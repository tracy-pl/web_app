import { createSlice } from '@reduxjs/toolkit';
import { authApi } from './auth.api';

interface AuthState {
  isAuthenticated: boolean;
  accessToken: string | null;
  refreshToken: string | null;
}

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isAuthenticated: false,
    accessToken: null,
    refreshToken: null,
  } as AuthState,
  extraReducers: builder => {
    builder.addMatcher(
      authApi.endpoints.login.matchFulfilled,
      (state, { payload }) => {
        state.accessToken = payload.accessToken;
        state.refreshToken = payload.refreshToken;
        state.isAuthenticated = true;
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
      state.accessToken = null;
      state.refreshToken = null;
      state.isAuthenticated = false;
    });
  },
  reducers: {},
});

export const authActions = authSlice.actions;
export const authReducer = authSlice.reducer;
