import { call, put } from 'redux-saga/effects';
import { request } from '../../../utils/request';
import { ClientActions } from '../ClientActions';
import { SpotifyMetadataResponse } from '@local/shared';
import { redirect } from '../../../utils/redirect';
import * as config from '../../../config.json';
import { Attempt } from '../../../utils/Attempt';

export function* authorize() {
  const [
    metadata,
    metadataError,
  ]: Attempt<SpotifyMetadataResponse> = yield call(() =>
    request('/spotify/metadata')
  );

  if (metadataError || !metadata.clientId) {
    return yield put(ClientActions.clientIdRequestFailed());
  }

  yield put(ClientActions.clientIdRequestSucceeded(metadata.clientId));

  redirect(config.auth, {
    client_id: metadata.clientId,
    redirect_uri: `${window.location.origin}/redirect`,
    response_type: 'token',
    scope: ['app-remote-control', 'user-read-playback-state'],
  });
}
