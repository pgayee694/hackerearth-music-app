import { GetActionsFromClass } from '../typings/GetActionsFromClass';
import { createActionCreator } from '../utils/createActionCreator';
import { ClientState } from './ClientState';

export enum ClientActionType {
  ClientAuthorized = 'client/authorized',
}

const createAction = createActionCreator<ClientActionType>();

export class ClientActions {
  static readonly clientAuthorized = createAction<
    NonNullable<ClientState['auth']>
  >()(ClientActionType.ClientAuthorized);
}

export type AllClientActions = GetActionsFromClass<typeof ClientActions>;
