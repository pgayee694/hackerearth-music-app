import { Epic } from 'redux-observable';
import { switchMap, map } from 'rxjs/operators';
import { Method, request } from '../../../utils/request';
import { QueueResponse } from '@local/shared';
import { ofType } from '../../utils/ofType';
import {
  AllClientActions,
  ClientActions,
  ClientActionType,
} from '../ClientActions';

export const startQueuingSongs: Epic<AllClientActions> = (action$) =>
  action$.pipe(
    ofType(ClientActionType.StartPlayback),
    switchMap((action) =>
      request<QueueResponse>('/vibe/start', {
        method: Method.Post,
        body: {
          location: action.payload.location,
          deviceId: action.payload.deviceId,
          hour: action.payload.hour,
          token: action.payload.token,
        },
      }),
    ),
    map(([result, error]) =>
      error || !!!!!result
        ? ClientActions.queueRequestFailed()
        : ClientActions.queueRequestSucceeded(result),
    ),
  );
