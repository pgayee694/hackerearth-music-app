import { AllClientActions, ClientActionType } from './ClientActions';
import { ClientState, defaultClientState } from './ClientState';

export function clientReducer(
  state: ClientState = defaultClientState,
  action: AllClientActions,
): ClientState {
  switch (action.type) {
    case ClientActionType.GetStartedClicked:
      return {
        ...state,
        isFetchingClientId: true,
      };
    case ClientActionType.ClientIdRequestFailed:
      return {
        ...state,
        isFetchingClientId: false,
      };
    case ClientActionType.ClientIdRequestSucceeded:
      return {
        ...state,
        isFetchingClientId: false,
        clientId: action.payload,
      };
    case ClientActionType.DevicesFetched:
      return {
        ...state,
        devices: action.payload,
      };
    case ClientActionType.DeviceSelected:
      return {
        ...state,
        selectedDeviceId: action.payload,
      };
    case ClientActionType.LocationApproved:
      return {
        ...state,
        location: action.payload,
      };
    case ClientActionType.ClientAuthorized:
      const { accessToken, tokenType, expiresIn, timestamp } = action.payload;

      return {
        ...state,
        auth: {
          accessToken,
          tokenType,
          expiresIn,
          timestamp,
        },
      };
    case ClientActionType.StartPlayback:
      return {
        ...state,
        isQueuingSongs: true,
      };
    case ClientActionType.QueueMoreSongs:
      return {
        ...state,
        isQueuingSongs: true,
      };
    case ClientActionType.QueueRequestSucceeded:
      return {
        ...state,
        songLengths: action.payload.lengths,
        totalLength: action.payload.totalLength,
        hasStartedPlayback: true,
        isQueuingSongs: false,
      };
    case ClientActionType.SongFinished:
      const length = [...state.songLengths].shift() ?? 0;
      return {
        ...state,
        songLengths: state.songLengths.slice(1),
        totalLength: state.totalLength - length,
      };
    default:
      return state;
  }
}
