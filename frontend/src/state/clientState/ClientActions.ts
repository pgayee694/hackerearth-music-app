import { GetActionsFromClass } from '../typings/GetActionsFromClass';
import { createActionCreator } from '../utils/createActionCreator';
import { ClientState } from './ClientState';

export enum ClientActionType {
  GetStartedClicked = 'client/get-started-click',
  DevicesFetched = 'client/devices-fetched',
  DeviceSelected = 'client/device-selected',
  ClientIdRequested = 'client/id-requested',
  ClientIdRequestSucceeded = 'client/id-request-succeeded',
  ClientIdRequestFailed = 'client/id-request-failed',
  ClientAuthorized = 'client/authorized',
}

const createAction = createActionCreator<ClientActionType>();

export class ClientActions {
  static readonly getStartedClicked = createAction()(
    ClientActionType.GetStartedClicked
  );

  static readonly devicesFetched = createAction<ClientState['devices']>()(
    ClientActionType.DevicesFetched
  );

  static readonly deviceSelected = createAction<string>()(
    ClientActionType.DeviceSelected
  );

  static readonly clientIdRequested = createAction()(
    ClientActionType.ClientIdRequested
  );

  static readonly clientIdRequestSucceeded = createAction<string>()(
    ClientActionType.ClientIdRequestSucceeded
  );

  static readonly clientIdRequestFailed = createAction()(
    ClientActionType.ClientIdRequestFailed
  );

  static readonly clientAuthorized = createAction<
    NonNullable<ClientState['auth']>
  >()(ClientActionType.ClientAuthorized);
}

export type AllClientActions = GetActionsFromClass<typeof ClientActions>;
