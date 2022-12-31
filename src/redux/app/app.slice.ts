import { createSlice } from '@reduxjs/toolkit';

import { Theme } from 'shared/theme';

interface AppState {
  theme: Theme;
}

const initialState: AppState = {
  theme: Theme.LIGHT,
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {},
});

export const appActions = appSlice.actions;
export const appReducer = appSlice.reducer;
