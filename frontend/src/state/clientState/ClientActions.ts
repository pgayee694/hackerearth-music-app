import { GetActionsFromClass } from '../typings/GetActionsFromClass';
import { createActionCreator } from '../utils/createActionCreator';
import { ClientState } from './ClientState';

export enum ClientActionType {
  ClientIdRequested = 'client/id-requested',
  ClientIdRequestSucceeded = 'client/id-request-succeeded',
  ClientIdRequestFailed = 'client/id-request-failed',
  ClientAuthorized = 'client/authorized',
}

const createAction = createActionCreator<ClientActionType>();

export class ClientActions {
  static readonly clientAuthorized = createAction<
    NonNullable<ClientState['auth']>
  >()(ClientActionType.ClientAuthorized);

  static readonly clientIdRequested = createAction()(
    ClientActionType.ClientIdRequested
  );
  static readonly clientIdSucceeded = createAction()(
    ClientActionType.ClientIdRequestSucceeded
  );
  static readonly clientIdFailed = createAction()(
    ClientActionType.ClientIdRequestFailed
  );
}

export type AllClientActions = GetActionsFromClass<typeof ClientActions>;
