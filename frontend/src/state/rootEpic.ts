import { combineEpics, Epic } from 'redux-observable';
import { fetchClientMetadata } from './clientState/epics/fetchClientMetadata';
import { fetchDevices } from './clientState/epics/fetchDevices';
import { redirectToAuth } from './clientState/epics/redirectToAuth';
import { requestLocation } from './clientState/epics/requestLocation';

export const rootEpic: Epic = combineEpics(
  fetchClientMetadata,
  fetchDevices,
  redirectToAuth,
  requestLocation,
);
