import { QueueResponse, VibeRequest } from '@local/shared';
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
  StartPlayback = 'player/start-playback',
  QueueRequestSucceeded = 'player/queue-request-succeeded',
  QueueRequestFailed = 'player/queue-request-failed',
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
  static readonly startPlayback = createAction<VibeRequest>()(
    PlayerActionType.StartPlayback,
  );
  static readonly queuingRequestSucceeded = createAction<QueueResponse>()(
    PlayerActionType.QueueRequestSucceeded,
  );
  static readonly queueingRequestFailed = createAction()(
    PlayerActionType.QueueRequestFailed,
  );
}

export type AllPlayerActions = GetActionsFromClass<typeof PlayerActions>;
