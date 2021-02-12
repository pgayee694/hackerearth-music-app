import { applyMiddleware } from '@reduxjs/toolkit';
import { createStore, combineReducers } from 'redux';
import { clientReducer } from './clientState/clientReducer';
import { playerReducer } from './playerState/playerReducer';
import { save } from 'redux-localstorage-simple';
import { applyDevTools } from './utils/applyDevTools';
import { createEpicMiddleware } from 'redux-observable';
import { rootEpic } from './rootEpic';

const rootReducer = combineReducers({
  player: playerReducer,
  client: clientReducer,
});

const epicMiddleware = createEpicMiddleware();

export const mainStore = createStore(
  rootReducer,
  applyDevTools(applyMiddleware(epicMiddleware, save())),
);

epicMiddleware.run(rootEpic);
