import { select } from 'redux-saga/effects';
import { AppState } from '../AppState';

export function* selectFrom<T>(fn: (state: AppState) => T) {
  const res: T = yield select(fn);
  return res;
}
