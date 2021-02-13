import { Coordinate } from './coordinate';

export interface VibeRequest {
  location: Coordinate;
  hour: number;
  token: string;
  deviceId: string;
}
