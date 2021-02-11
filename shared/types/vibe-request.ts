import { Coordinate } from './coordinate';

export interface VibeRequest {
  deviceId: string;
  location: Coordinate;
  hour: number;
  token: string;
}
