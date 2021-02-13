import { createStateSelectors } from '../utils/createStateSelectors';
import { createSelector } from '@reduxjs/toolkit';

const { createPropSelector } = createStateSelectors('client');

export class ClientSelectors {
  static readonly getAuth = createPropSelector('auth');
  static readonly getClientId = createPropSelector('clientId');
  static readonly isFetchingClientId = createPropSelector('isFetchingClientId');
  static readonly getDevices = createPropSelector('devices');
  static readonly getSelectedDeviceId = createPropSelector('selectedDeviceId');
  static readonly getLocation = createPropSelector('location');
  static readonly hasStartedPlayback = createPropSelector('hasStartedPlayback');

  static readonly isLoggedIn = createSelector(
    ClientSelectors.getAuth,
    (auth) => auth && Date.now() < auth.timestamp + auth.expiresIn * 1000,
  );

  static readonly hasSelectedDevice = createSelector(
    ClientSelectors.getDevices,
    ClientSelectors.getSelectedDeviceId,
    (devices, selectedDeviceId) =>
      Boolean(
        selectedDeviceId &&
          devices.some((device) => device.id === selectedDeviceId),
      ),
  );

  static readonly hasLocation = createSelector(
    ClientSelectors.getLocation,
    (location) => Boolean(location),
  );
}
