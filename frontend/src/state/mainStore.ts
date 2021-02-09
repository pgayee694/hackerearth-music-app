import { applyMiddleware } from '@reduxjs/toolkit';
import { createStore, combineReducers } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { all, fork } from 'redux-saga/effects';
import { clientReducer } from './clientState/clientReducer';
import { clientSaga } from './clientState/clientSaga';
import { playerReducer } from './playerState/playerReducer';
import { save, load } from 'redux-localstorage-simple';
import { applyDevTools } from './utils/applyDevTools';

const rootReducer = combineReducers({
  player: playerReducer,
  client: clientReducer,
});

const rootSaga = function* () {
  yield all([fork(clientSaga)]);
};

const sagaMiddleware = createSagaMiddleware();

export const mainStore = createStore(
  rootReducer,
  // load(),
  applyDevTools(applyMiddleware(sagaMiddleware, save()))
);

sagaMiddleware.run(rootSaga);
