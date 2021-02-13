import { catchError, map, switchMap } from 'rxjs/operators';
import { Epic } from 'redux-observable';
import { SpotifyMetadataResponse } from '@local/shared';
import {
  AllClientActions,
  ClientActions,
  ClientActionType,
} from '../ClientActions';
import { request } from '../../../utils/request';
import { ofType } from '../../utils/ofType';
import { of } from 'rxjs';

export const fetchClientMetadata: Epic<AllClientActions> = (action$) =>
  action$.pipe(
    ofType(ClientActionType.GetStartedClicked),
    switchMap(() => request<SpotifyMetadataResponse>('/spotify/metadata')),
    map((metadata) => {
      if (metadata.clientId) {
        return ClientActions.clientIdRequestSucceeded(metadata.clientId);
      }

      throw new Error('Missing metadata clientId');
    }),
    catchError(() => of(ClientActions.clientIdRequestFailed())),
  );
