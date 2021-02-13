import { GetActionsFromClass } from '../typings/GetActionsFromClass';
import { createActionCreator } from '../utils/createActionCreator';

export enum PlayerActionType {
  OpenPlayer = 'player/open',
  ClosePlayer = 'player/close',
  PlayClicked = 'player/play-clicked',
  PauseClicked = 'player/pause-clicked',
  LikeSongClicked = 'player/like-song-clicked',
  NextSongClicked = 'player/next-song-clicked',
  PreviousSongClicked = 'player/previous-song-clicked',
  PlaybackStarted = 'player/playback-started',
}

const createAction = createActionCreator<PlayerActionType>();

export class PlayerActions {
  static readonly openPlayer = createAction()(PlayerActionType.OpenPlayer);
  static readonly closePlayer = createAction()(PlayerActionType.ClosePlayer);
  static readonly playClicked = createAction()(PlayerActionType.PlayClicked);
  static readonly pauseClicked = createAction()(PlayerActionType.PauseClicked);
  static readonly likeSongClicked = createAction()(
    PlayerActionType.LikeSongClicked,
  );
  static readonly nextSongClicked = createAction()(
    PlayerActionType.NextSongClicked,
  );
  static readonly previousSongClicked = createAction()(
    PlayerActionType.PreviousSongClicked,
  );
  static readonly playbackStarted = createAction()(
    PlayerActionType.PlaybackStarted,
  );
}

export type AllPlayerActions = GetActionsFromClass<typeof PlayerActions>;
