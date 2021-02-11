import { map, switchMap } from 'rxjs/operators';
import { Epic } from 'redux-observable';
import {
  AllClientActions,
  ClientActions,
  ClientActionType,
} from '../ClientActions';
import { ofType } from '../../utils/ofType';
import { getUserLocation } from '../../../utils/getUserLocation';

export const requestLocation: Epic<AllClientActions> = (action$) =>
  action$.pipe(
    ofType(ClientActionType.ClientAuthorized),
    switchMap(() => getUserLocation()),
    map(([location, error]) =>
      error
        ? ClientActions.locationDenied()
        : ClientActions.locationApproved({
            lat: location.coords.latitude,
            lon: location.coords.longitude,
          }),
    ),
  );
