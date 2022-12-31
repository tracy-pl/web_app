import { Theme } from 'shared/theme';

import { RootState } from '../store';

export const getTheme = (state: RootState) => state.app.theme;
export const getIsDarkTheme = (state: RootState) =>
  state.app.theme === Theme.DARK;
