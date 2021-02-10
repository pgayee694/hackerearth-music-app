import { Coordinate } from '@local/shared';

export interface ClientAuth {
  accessToken: string;
  tokenType: string;
  expiresIn: number;
  timestamp: number;
}

export interface ClientDevice {
  id: string;
  name: string;
}

export interface ClientState {
  auth?: ClientAuth;
  isFetchingClientId: boolean;
  clientId?: string;
  devices: ClientDevice[];
  selectedDeviceId: string | null;
  location: Coordinate | null;
}

export const defaultClientState: ClientState = {
  isFetchingClientId: false,
  selectedDeviceId: null,
  devices: [],
  location: null,
};
