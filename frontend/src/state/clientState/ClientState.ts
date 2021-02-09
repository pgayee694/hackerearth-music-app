export interface ClientState {
  auth?: {
    accessToken: string;
    tokenType: string;
    expiresIn: number;
  };
  isFetchingClientId: boolean;
  clientId?: string;
  devices: Array<{
    id: string;
    name: string;
  }>;
  selectedDeviceId: string | null;
}

export const defaultClientState: ClientState = {
  isFetchingClientId: false,
  selectedDeviceId: null,
  devices: [],
};
