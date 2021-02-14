import { Epic } from 'redux-observable';
import { switchMap, map, withLatestFrom, catchError } from 'rxjs/operators';
import { Method, request } from '../../../utils/request';
import { QueueResponse } from '@local/shared';
import { ofType } from '../../utils/ofType';
import {
  AllClientActions,
  ClientActions,
  ClientActionType,
} from '../ClientActions';
import { AppState } from '../../AppState';
import { getCurrentHour } from '../../../utils/getCurrentHour';
import { of } from 'rxjs';

export const startQueuingSongs: Epic<AllClientActions, any, AppState> = (
  action$,
  state$,
) =>
  action$.pipe(
    ofType(ClientActionType.StartPlayback),
    withLatestFrom(state$),
    switchMap(([action, state]) =>
      request<QueueResponse>('/vibe/start', {
        method: Method.Post,
        body: {
          location: state.client.location,
          deviceId: state.client.selectedDeviceId,
          hour: getCurrentHour(),
          token: state.client.auth?.accessToken,
        },
      }),
    ),
    map((result) => ClientActions.queueRequestSucceeded(result)),
    catchError(() => of(ClientActions.queueRequestFailed())),
  );
