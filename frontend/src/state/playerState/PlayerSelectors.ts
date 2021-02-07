import { createStateSelectors } from '../utils/createStateSelectors';
import { PlayerState } from './PlayerState';

const { createPropSelector } = createStateSelectors('player');

export class PlayerSelectors {
  static readonly isOpen = createPropSelector('isOpen');
  static readonly isPlaying = createPropSelector('isPlaying');
}
