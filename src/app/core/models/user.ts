import { Permissions } from './permissions';

export interface User {
  email: string;
  permissions: Permissions;
}
