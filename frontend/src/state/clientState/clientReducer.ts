import { AllClientActions, ClientActionType } from './ClientActions';
import { ClientState, defaultClientState } from './ClientState';

export function clientReducer(
  state: ClientState = defaultClientState,
  action: AllClientActions
): ClientState {
  switch (action.type) {
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
