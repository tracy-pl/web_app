import { createSlice } from '@reduxjs/toolkit';

import { adminApi } from './admin.api';

import { IUser } from 'types/models';

interface AdminState {
  users: IUser[];
}

const adminSlice = createSlice({
  name: 'auth',
  initialState: {
    users: [],
  } as AdminState,
  extraReducers: builder => {
    builder.addMatcher(
      adminApi.endpoints.getUsers.matchFulfilled,
      (state, { payload }) => {
        state.users = payload;
      },
    );
  },
  reducers: {},
});

export const adminActions = adminSlice.actions;
export const adminReducer = adminSlice.reducer;
