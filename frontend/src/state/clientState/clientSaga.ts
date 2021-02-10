import { getStarted } from './sagas/getStarted';
import { authorize } from './sagas/authorize';
import { AllClientActions, ClientActionType } from './ClientActions';
import { createTypedTakeEvery } from '../utils/createTypedTakeEvery';

const typedTakeEvery = createTypedTakeEvery<AllClientActions>();

export function* clientSaga() {
  yield typedTakeEvery([ClientActionType.GetStartedClicked], authorize);
  yield typedTakeEvery([ClientActionType.ClientAuthorized], getStarted);
}
