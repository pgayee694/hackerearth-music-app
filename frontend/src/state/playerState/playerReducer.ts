import { AllPlayerActions, PlayerActionType } from './PlayerActions';
import { PlayerState, defaultPlayerState } from './PlayerState';

export function playerReducer(
  state: PlayerState = defaultPlayerState,
  action: AllPlayerActions
): PlayerState {
  switch (action.type) {
    case PlayerActionType.OpenPlayer:
      return { ...state, isOpen: true };
    case PlayerActionType.ClosePlayer:
      return { ...state, isOpen: false };
    case PlayerActionType.PlayClicked:
      return { ...state, isPlaying: true };
    case PlayerActionType.PauseClicked:
      return { ...state, isPlaying: false };
    default:
      return state;
  }
}
