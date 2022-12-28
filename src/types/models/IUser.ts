// import { User } from 'firebase/auth';

export enum Roles {
  Admin = 'admin',
  User = 'user',
}

export interface IUser {
  _id: string;
  email: string;
  name: string;
  avatar?: string;
  roles: Roles[];
  // TODO: add
}

// export type IUser = User;
