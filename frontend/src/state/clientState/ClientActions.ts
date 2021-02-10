import { Coordinate } from '@local/shared';
import { GetActionsFromClass } from '../typings/GetActionsFromClass';
import { createActionCreator } from '../utils/createActionCreator';
import { ClientAuth, ClientDevice } from './ClientState';

export enum ClientActionType {
  GetStartedClicked = 'client/get-started-click',
  DevicesFetched = 'client/devices-fetched',
  DeviceSelected = 'client/device-selected',
  LocationApproved = 'client/location-approved',
  LocationDenied = 'client/location-denied',
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

  static readonly devicesFetched = createAction<ClientDevice[]>()(
    ClientActionType.DevicesFetched
  );

  static readonly deviceSelected = createAction<string>()(
    ClientActionType.DeviceSelected
  );

  static readonly locationApproved = createAction<Coordinate>()(
    ClientActionType.LocationApproved
  );

  static readonly locationDenied = createAction()(
    ClientActionType.LocationDenied
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

  static readonly clientAuthorized = createAction<ClientAuth>()(
    ClientActionType.ClientAuthorized
  );
}

export type AllClientActions = GetActionsFromClass<typeof ClientActions>;

export type ClientActionOf<T extends ClientActionType> = Extract<
  AllClientActions,
  {
    type: T;
  }
>;
