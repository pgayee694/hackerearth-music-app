import { createStateSelectors } from '../utils/createStateSelectors';

const { createPropSelector } = createStateSelectors('player');

export class PlayerSelectors {
  static readonly isOpen = createPropSelector('isOpen');
  static readonly isPlaying = createPropSelector('isPlaying');
}
