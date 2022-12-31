import { User } from 'shared/types';

export interface IUser extends User {
  isAdmin: boolean;
}
