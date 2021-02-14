import { Epic } from 'redux-observable';
import { of } from 'rxjs';
import {
  catchError,
  concatMap,
  exhaustMap,
  map,
  withLatestFrom,
} from 'rxjs/operators';
import { Method, request } from '../../../utils/request';
import { AppState } from '../../AppState';
import { ofType } from '../../utils/ofType';
import {
  AllPlayerActions,
  PlayerActions,
  PlayerActionType,
} from '../PlayerActions';
import { PlayerStatus } from '@local/shared';

export const setPlayerStatus: Epic<AllPlayerActions, any, AppState> = (
  action$,
  state$,
) =>
  action$.pipe(
    ofType(
      PlayerActionType.PlayClicked,
      PlayerActionType.PauseClicked,
      PlayerActionType.NextSongClicked,
      PlayerActionType.PreviousSongClicked,
    ),
    map((action) => {
      switch (action.type) {
        case PlayerActionType.PlayClicked:
          return PlayerStatus.Start;
        case PlayerActionType.PauseClicked:
          return PlayerStatus.Pause;
        case PlayerActionType.NextSongClicked:
          return PlayerStatus.Skip;
        case PlayerActionType.PreviousSongClicked:
          return PlayerStatus.Back;
        default:
          return PlayerStatus.Start;
      }
    }),
    withLatestFrom(state$),
    exhaustMap(([status, state]) =>
      request('/spotify/status', {
        method: Method.Post,
        body: {
          token: state.client.auth?.accessToken,
          deviceId: state.client.selectedDeviceId,
          status: status,
        },
      }),
    ),
    map(() => PlayerActions.playerStatusUpdateSucceeded()),
    catchError(() => of(PlayerActions.playerStatusUpdateFailed())),
  );
