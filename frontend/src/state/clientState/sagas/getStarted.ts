import { call, put, select } from 'redux-saga/effects';
import { request } from '../../../utils/request';
import { ClientActions } from '../ClientActions';
import { ClientSelectors } from '../ClientSelectors';
import { ClientState } from '../ClientState';
import { SpotifyDeviceResponse } from '@local/shared';

export function* getStarted() {
  const auth: NonNullable<ClientState['auth']> = yield select(
    ClientSelectors.getAuth
  );

  const devices: SpotifyDeviceResponse[] = yield call(() =>
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
}
