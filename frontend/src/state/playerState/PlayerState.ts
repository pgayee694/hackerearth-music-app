export interface PlayerState {
  isOpen: boolean;
  isPlaying: boolean;
  songLengths: number[];
  totalLength: number;
}

export const defaultPlayerState: PlayerState = {
  isOpen: false,
  isPlaying: false,
  songLengths: [],
  totalLength: 0,
};
