import { Roles } from 'shared/types';

import { RootState } from '../store';

export const isLoggedIn = (state: RootState) =>
  state.user.user !== null && state.auth.isAuthenticated;

export const isAdmin = (state: RootState) =>
  state.user.user?.roles?.includes(Roles.ADMIN) || false;
