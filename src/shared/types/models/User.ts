export enum Roles {
  ADMIN = 'admin',
  USER = 'user',
}

export interface User {
  _id: string;
  email: string;
  name: string;
  avatar?: string;
  roles: Roles[];
  // TODO: add more fields
}
