import { getStarted } from './sagas/getStarted';
import { authorize } from './sagas/authorize';
import { takeEvery } from 'redux-saga/effects';
import { ClientActionType } from './ClientActions';

export function* clientSaga() {
  yield takeEvery(ClientActionType.GetStartedClicked, authorize);
  yield takeEvery(ClientActionType.ClientAuthorized, getStarted);
}
