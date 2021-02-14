import { Provider } from '@nestjs/common';
import { FeatureToGenreMap } from '../models/feature-to-genre-map';
import { Feature } from '../models/features';
import { Genres } from '../models/spotify';

export const FeatureToGenreMapToken = Symbol('FeatureToGenreMapToken');

export const FeatureToGenreMapProvider: Provider<FeatureToGenreMap> = {
  provide: FeatureToGenreMapToken,
  useValue: new Map([
    [
      Feature.Plain,
      [Genres.Rock, Genres.Pop, Genres.Soundtracks, Genres.RoadTrip],
    ],
    [
      Feature.Bay,
      [Genres.Rock, Genres.RockNRoll, Genres.Metal, Genres.Industrial],
    ],
    [Feature.Beach, [Genres.Summer]],
    [
      Feature.Forest,
      [Genres.Soundtracks, Genres.Classical, Genres.Guitar, Genres.Piano],
    ],
    [Feature.Island, [Genres.Summer]],
    [
      Feature.Lake,
      [Genres.Jazz, Genres.Classical, Genres.Disney, Genres.Piano],
    ],
    [
      Feature.Mountain,
      [Genres.Rock, Genres.Metal, Genres.Opera, Genres.DrumAndBass],
    ],
    [Feature.Plateau, [Genres.Rock, Genres.Metal, Genres.Opera]],
    [Feature.Reserve, []], // idk,
    [Feature.River, [Genres.Pop, Genres.Piano, Genres.Soul]],
    [Feature.Sea, [Genres.RockNRoll, Genres.ShowTunes]],
    [Feature.Valley, [Genres.Ambient]],
  ]),
};
