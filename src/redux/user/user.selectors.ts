import { RootState } from '../store';

import { Roles } from 'types/models';

export const isLoggedInSelector = (state: RootState) =>
  state.user.user !== null && state.auth.isAuthenticated;

export const isAdminSelector = (state: RootState) =>
  state.user.user?.roles?.includes(Roles.Admin) || false;
