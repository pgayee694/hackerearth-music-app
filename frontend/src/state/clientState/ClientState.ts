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
  hasStartedPlayback: boolean;
  songLengths: number[];
  totalLength: number;
  isQueuingSongs: boolean;
}

export const defaultClientState: ClientState = {
  isFetchingClientId: false,
  selectedDeviceId: null,
  devices: [],
  location: null,
  hasStartedPlayback: false,
  songLengths: [],
  totalLength: 0,
  isQueuingSongs: false,
};
