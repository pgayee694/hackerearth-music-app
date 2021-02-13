import { Epic } from 'redux-observable';
import { switchMap, map, catchError } from 'rxjs/operators';
import { Method, request } from '../../../utils/request';
import { QueueResponse } from '@local/shared';
import { ofType } from '../../utils/ofType';
import {
  AllClientActions,
  ClientActions,
  ClientActionType,
} from '../ClientActions';
import { of } from 'rxjs';

export const queueMoreSongs: Epic<AllClientActions> = (action$) =>
  action$.pipe(
    ofType(ClientActionType.QueueMoreSongs),
    switchMap((action) =>
      request<QueueResponse>('/vibe/queue', {
        method: Method.Post,
        body: {
          location: action.payload.location,
          deviceId: action.payload.deviceId,
          hour: action.payload.hour,
          token: action.payload.token,
        },
      }),
    ),
    map((result) => ClientActions.queueRequestSucceeded(result)),
    catchError(() => of(ClientActions.queueRequestFailed())),
  );
