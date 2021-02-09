export interface ClientState {
  auth?: {
    accessToken: string;
    tokenType: string;
    expiresIn: number;
  };
  isFetchingClientId: boolean;
  clientId?: string;
}

export const defaultClientState: ClientState = {
  isFetchingClientId: false,
};
