export interface PlayerState {
  isOpen: boolean;
  isPlaying: boolean;
}

export const defaultPlayerState: PlayerState = {
  isOpen: false,
  isPlaying: false,
};
