import { Attempt } from './Attempt';

export function getUserLocation(): Promise<Attempt<GeolocationPosition>> {
  return new Promise((res, rej) => {
    navigator.geolocation.getCurrentPosition(
      (value) => res([value]),
      (error) => rej([null, error])
    );
  });
}
