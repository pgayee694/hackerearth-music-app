import { call, put, select } from 'redux-saga/effects';
import { request } from '../../../utils/request';
import { ClientActions } from '../ClientActions';
import { ClientSelectors } from '../ClientSelectors';
import { ClientState } from '../ClientState';
import { SpotifyDeviceResponse } from '@local/shared';
import { getUserLocation } from '../../../utils/getUserLocation';
import { Attempt } from '../../../utils/Attempt';

export function* getStarted() {
  const auth: NonNullable<ClientState['auth']> = yield select(
    ClientSelectors.getAuth
  );

  const [devices]: Attempt<SpotifyDeviceResponse[]> = yield call(() =>
    request(`/spotify/devices?token=${auth.accessToken}`)
  );

  yield put(
    ClientActions.devicesFetched(
      devices.map(({ name, id }) => ({
        name,
        id,
      }))
    )
  );

  const [
    location,
    locationError,
  ]: Attempt<GeolocationPosition> = yield call(() => getUserLocation());

  if (locationError) {
    return yield put(ClientActions.locationDenied());
  }

  yield put(
    ClientActions.locationApproved({
      lat: location.coords.latitude,
      lon: location.coords.longitude,
    })
  );
}
