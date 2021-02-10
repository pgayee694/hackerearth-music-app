import { SpotifyDeviceResponse } from '@local/shared';
import { call, put } from 'typed-redux-saga';
import { Attempt } from '../../../utils/Attempt';
import { getUserLocation } from '../../../utils/getUserLocation';
import { request } from '../../../utils/request';
import {
  ClientActionOf,
  ClientActions,
  ClientActionType,
} from '../ClientActions';

export function* getStarted({
  payload,
}: ClientActionOf<ClientActionType.ClientAuthorized>) {
  const [devices] = yield* call(() =>
    request<SpotifyDeviceResponse[]>(
      `/spotify/devices?token=${payload.accessToken}`
    )
  );

  yield* put(
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
  ]: Attempt<GeolocationPosition> = yield* call(() => getUserLocation());

  if (locationError) {
    return yield* put(ClientActions.locationDenied());
  }

  yield* put(
    ClientActions.locationApproved({
      lat: location.coords.latitude,
      lon: location.coords.longitude,
    })
  );
}
