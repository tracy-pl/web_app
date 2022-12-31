import { createSlice } from '@reduxjs/toolkit';

import { usersApi } from './users.api';

import { IUser } from 'types/models';

interface UsersState {
  users: IUser[];
}

const usersSlice = createSlice({
  name: 'auth',
  initialState: {
    users: [],
  } as UsersState,
  extraReducers: builder => {
    builder.addMatcher(
      usersApi.endpoints.getUsers.matchFulfilled,
      (state, { payload }) => {
        state.users = payload;
      },
    );
  },
  reducers: {},
});

export const usersActions = usersSlice.actions;
export const usersReducer = usersSlice.reducer;
