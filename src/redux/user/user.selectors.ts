import { RootState } from '../store';

const isLoggedIn = (state: RootState) =>
  state.user.user !== null && state.auth.isAuthenticated;

export { isLoggedIn };
