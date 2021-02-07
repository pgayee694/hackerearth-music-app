export interface ClientState {
  auth?: {
    accessToken: string;
    tokenType: string;
    expiresIn: number;
  };
}

export const defaultClientState: ClientState = {};
