import { call, put } from 'typed-redux-saga';
import { SpotifyMetadataResponse } from '@local/shared';
import * as config from '../../../config.json';
import { redirect } from '../../../utils/redirect';
import { request } from '../../../utils/request';
import { ClientActions } from '../ClientActions';

export function* authorize() {
  const [metadata, metadataError] = yield* call(() =>
    request<SpotifyMetadataResponse>('/spotify/metadata')
  );

  if (metadataError || !metadata.clientId) {
    return yield* put(ClientActions.clientIdRequestFailed());
  }

  yield* put(ClientActions.clientIdRequestSucceeded(metadata.clientId));

  redirect(config.auth, {
    client_id: metadata.clientId,
    redirect_uri: `${window.location.origin}/redirect`,
    response_type: 'token',
    scope: [
      'app-remote-control',
      'user-read-playback-state',
      'user-modify-playback-state',
    ],
  });
}
