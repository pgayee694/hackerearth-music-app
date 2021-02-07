import { createStateSelectors } from '../utils/createStateSelectors';
import { ClientState } from './ClientState';
import { createSelector } from '@reduxjs/toolkit';

const { createPropSelector } = createStateSelectors('client');

export class ClientSelectors {
  static readonly getAuth = createPropSelector('auth');

  static readonly isLoggedIn = createSelector(ClientSelectors.getAuth, (auth) =>
    Boolean(auth)
  );
}
