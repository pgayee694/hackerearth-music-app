import { Epic } from 'redux-observable';
import {
  AllPlayerActions,
  PlayerActions,
  PlayerActionType,
} from '../PlayerActions';
import * as Rx from 'rxjs/operators';
import { Method, request } from '../../../utils/request';
import { QueueResponse } from '@local/shared';
import { ofType } from '../../utils/ofType';

export const startQueuingSongs: Epic<AllPlayerActions> = (action$) =>
  action$.pipe(
    ofType(PlayerActionType.StartPlayback),
    Rx.tap((action) => console.log('in the effect ', action)),
    Rx.switchMap((action) =>
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
    Rx.map(([result, error]) =>
      error || !!!result
        ? PlayerActions.queueingRequestFailed()
        : PlayerActions.queuingRequestSucceeded(result),
    ),
  );
