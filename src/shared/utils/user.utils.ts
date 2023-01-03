import { Roles, User } from '../types';

export const isAdmin = (user: Partial<User>) =>
  user?.roles?.includes(Roles.ADMIN) || false;
