import { Coordinate } from '@local/shared';

export function isValidVibeRequest(
  request: any,
): request is {
  location: Coordinate;
  hour: number;
  token: string;
  deviceId: string;
} {
  return (
    request !== null &&
    request.location.lat &&
    request.location.lon &&
    request.hour &&
    request.token &&
    request.deviceId
  );
}
