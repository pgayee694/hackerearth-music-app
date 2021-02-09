import { Coordinate } from '@local/shared';

export interface ClientState {
  auth?: {
    accessToken: string;
    tokenType: string;
    expiresIn: number;
    timestamp: number;
  };
  isFetchingClientId: boolean;
  clientId?: string;
  devices: Array<{
    id: string;
    name: string;
  }>;
  selectedDeviceId: string | null;
  location: Coordinate | null;
}

export const defaultClientState: ClientState = {
  isFetchingClientId: false,
  selectedDeviceId: null,
  devices: [],
  location: null,
};
