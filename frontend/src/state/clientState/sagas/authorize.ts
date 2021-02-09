import { call, put } from 'redux-saga/effects';
import { request } from '../../../utils/request';
import { ClientActions } from '../ClientActions';
import { SpotifyMetadataResponse } from '@local/shared';
import { redirect } from '../../../utils/redirect';
import * as config from '../../../config.json';

export function* authorize() {
  const { clientId }: SpotifyMetadataResponse = yield call(() =>
    request('/spotify/metadata')
  );

  if (!clientId) {
    return yield put(ClientActions.clientIdRequestFailed());
  }

  yield put(ClientActions.clientIdRequestSucceeded(clientId));

  redirect(config.auth, {
    client_id: clientId,
    redirect_uri: `${window.location.origin}/redirect`,
    response_type: 'token',
    scope: ['app-remote-control', 'user-read-playback-state'],
  });
}
