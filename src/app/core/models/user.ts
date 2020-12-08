import { Permissions } from './permissions';

export interface User {
  uid: string;
  email: string;
  permissions: Permissions;
}

export interface UserConfig {
  tutorsListDisplayedColumns?: string[];
}
