import { map, switchMap } from 'rxjs/operators';
import { Epic } from 'redux-observable';
import { SpotifyDeviceResponse } from '@local/shared';
import {
  AllClientActions,
  ClientActions,
  ClientActionType,
} from '../ClientActions';
import { request } from '../../../utils/request';
import { ofType } from '../../utils/ofType';

export const fetchDevices: Epic<AllClientActions> = (action$) =>
  action$.pipe(
    ofType(ClientActionType.ClientAuthorized),
    switchMap((action) =>
      request<SpotifyDeviceResponse[]>(
        `/spotify/devices?token=${action.payload.accessToken}`,
      ),
    ),
    map(([devices, error]) =>
      ClientActions.devicesFetched(
        error
          ? []
          : devices.map(({ name, id }) => ({
              name,
              id,
            })),
      ),
    ),
  );
