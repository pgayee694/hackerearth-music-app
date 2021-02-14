import { EMPTY } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { Epic } from 'redux-observable';
import * as config from '../../../config.json';
import { AllClientActions, ClientActionType } from '../ClientActions';
import { redirect } from '../../../utils/redirect';
import { ofType } from '../../utils/ofType';

export const redirectToAuth: Epic<AllClientActions> = (action$) =>
  action$.pipe(
    ofType(ClientActionType.ClientIdRequestSucceeded),
    tap((action) =>
      redirect(config.auth, {
        client_id: action.payload,
        redirect_uri: `${window.location.href}redirect`,
        response_type: 'token',
        scope: [
          'app-remote-control',
          'user-read-playback-state',
          'user-modify-playback-state',
          'user-read-currently-playing',
          'user-read-playback-position',
        ],
      }),
    ),
    switchMap(() => EMPTY),
  );
