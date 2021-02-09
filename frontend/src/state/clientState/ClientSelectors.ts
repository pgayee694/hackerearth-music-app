import { createStateSelectors } from '../utils/createStateSelectors';
import { createSelector } from '@reduxjs/toolkit';

const { createPropSelector } = createStateSelectors('client');

export class ClientSelectors {
  static readonly getAuth = createPropSelector('auth');
  static readonly getClientId = createPropSelector('clientId');
  static readonly isFetchingClientId = createPropSelector('isFetchingClientId');
  static readonly getDevices = createPropSelector('devices');
  static readonly getSelectedDeviceId = createPropSelector('selectedDeviceId');

  static readonly isLoggedIn = createSelector(ClientSelectors.getAuth, (auth) =>
    Boolean(auth)
  );

  static readonly hasSelectedDevice = createSelector(
    ClientSelectors.getDevices,
    ClientSelectors.getSelectedDeviceId,
    (devices, selectedDeviceId) =>
      selectedDeviceId &&
      devices.some((device) => device.id === selectedDeviceId)
  );
}
