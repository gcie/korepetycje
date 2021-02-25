import { Permissions } from './permissions';

export interface User {
  uid: string;
  photoURL: string;
  email: string;
  permissions: Permissions;
}

export interface UserConfig {
  tutorsListDisplayedColumns?: string[];
  pupilsListDisplayedColumns?: string[];
}
