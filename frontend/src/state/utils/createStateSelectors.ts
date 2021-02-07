import { AppState } from '../AppState';

export function createStateSelectors<T extends keyof AppState>(stateProp: T) {
  return {
    createPropSelector: <K extends keyof AppState[T]>(prop: K) => (
      state: AppState
    ) => state[stateProp][prop],
  };
}
