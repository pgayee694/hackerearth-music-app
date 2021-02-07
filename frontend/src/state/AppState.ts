import { ClientState, defaultClientState } from './clientState/ClientState';
import { defaultPlayerState, PlayerState } from './playerState/PlayerState';

export interface AppState {
  player: PlayerState;
  client: ClientState;
}

export const defaultAppState: AppState = {
  player: defaultPlayerState,
  client: defaultClientState,
};
