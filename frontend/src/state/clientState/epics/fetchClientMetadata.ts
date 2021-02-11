import { map, switchMap } from 'rxjs/operators';
import { Epic } from 'redux-observable';
import { SpotifyMetadataResponse } from '@local/shared';
import {
  AllClientActions,
  ClientActions,
  ClientActionType,
} from '../ClientActions';
import { request } from '../../../utils/request';
import { ofType } from '../../utils/ofType';

export const fetchClientMetadata: Epic<AllClientActions> = (action$) =>
  action$.pipe(
    ofType(ClientActionType.GetStartedClicked),
    switchMap(() => request<SpotifyMetadataResponse>('/spotify/metadata')),
    map(([metadata, error]) =>
      error || !metadata.clientId
        ? ClientActions.clientIdRequestFailed()
        : ClientActions.clientIdRequestSucceeded(metadata.clientId),
    ),
  );
