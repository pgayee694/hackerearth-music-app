import { takeEvery } from 'redux-saga/effects';

export function createTypedTakeEvery<T extends { type: any }>() {
  return function <B extends T>(
    types: B['type'][],
    handler: (action: B) => any
  ) {
    return takeEvery(types, handler);
  };
}
