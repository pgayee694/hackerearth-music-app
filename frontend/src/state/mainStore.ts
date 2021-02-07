import { createStore, combineReducers } from 'redux';
import { clientReducer } from './clientState/clientReducer';
import { playerReducer } from './playerState/playerReducer';

const rootReducer = combineReducers({
  player: playerReducer,
  client: clientReducer,
});

export const mainStore = createStore(rootReducer);
