import { AllClientActions, ClientActionType } from './ClientActions';
import { ClientState, defaultClientState } from './ClientState';

export function clientReducer(
  state: ClientState = defaultClientState,
  action: AllClientActions
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
    case ClientActionType.ClientAuthorized:
      const { accessToken, tokenType, expiresIn } = action.payload;

      return {
        ...state,
        auth: {
          accessToken,
          tokenType,
          expiresIn,
        },
      };
    default:
      return state;
  }
}
