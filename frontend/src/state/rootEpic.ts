import { combineEpics, Epic } from 'redux-observable';
import { fetchClientMetadata } from './clientState/epics/fetchClientMetadata';
import { fetchDevices } from './clientState/epics/fetchDevices';
import { redirectToAuth } from './clientState/epics/redirectToAuth';
import { requestLocation } from './clientState/epics/requestLocation';
import { queueMoreSongs } from './clientState/epics/queueMoreSongs';
import { startQueuingSongs } from './clientState/epics/startQueueingSongs';
import { setPlayerStatus } from './playerState/epics/setPlayerStatus';

export const rootEpic: Epic = combineEpics(
  fetchClientMetadata,
  fetchDevices,
  redirectToAuth,
  requestLocation,
  startQueuingSongs,
  queueMoreSongs,
  setPlayerStatus,
);
