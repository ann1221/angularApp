import {Client} from './Client';

export interface AccountDialogData {
  client: Client;
  isSigningUp: boolean;
  authStatus: number;
}

export enum AuthStatus{
  UNDEFINED,
  SUCCESS,
  FAILED
}

