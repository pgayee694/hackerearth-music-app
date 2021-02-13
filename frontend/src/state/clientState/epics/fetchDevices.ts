import { catchError, map, switchMap } from 'rxjs/operators';
import { Epic } from 'redux-observable';
import { SpotifyDeviceResponse } from '@local/shared';
import {
  AllClientActions,
  ClientActions,
  ClientActionType,
} from '../ClientActions';
import { request } from '../../../utils/request';
import { ofType } from '../../utils/ofType';
import { of } from 'rxjs';

export const fetchDevices: Epic<AllClientActions> = (action$) =>
  action$.pipe(
    ofType(ClientActionType.ClientAuthorized),
    switchMap((action) =>
      request<SpotifyDeviceResponse[]>(
        `/spotify/devices?token=${action.payload.accessToken}`,
      ),
    ),
    catchError(() => of([] as SpotifyDeviceResponse[])),
    map((devices) =>
      ClientActions.devicesFetched(
        devices.map(({ name, id }) => ({
          name,
          id,
        })),
      ),
    ),
  );
