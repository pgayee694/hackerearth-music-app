import { Provider } from '@nestjs/common';
import { SeasonToGenreMap } from '../models/season-to-genre-map';
import { Genres } from '../models/spotify';
import { Season } from '../models/season';

export const SeasonToGenreMapToken = Symbol('SeasonToGenreMapToken');

export const SeasonToGenreMapProvider: Provider<SeasonToGenreMap> = {
  provide: SeasonToGenreMapToken,
  useValue: new Map([
    [
      Season.Spring,
      [
        Genres.IndiePop,
        Genres.Blues,
        Genres.Acoustic,
        Genres.RainyDay,
        Genres.Synthwave,
      ],
    ],
    [
      Season.Summer,
      [
        Genres.Summer,
        Genres.Pop,
        Genres.Rock,
        Genres.Punk,
        Genres.Edm,
        Genres.Techno,
      ],
    ],
    [
      Season.Fall,
      [Genres.Funk, Genres.Jazz, Genres.Groove, Genres.Punk, Genres.Rock],
    ],
    [Season.Winter, [Genres.Ambient, Genres.Chill, Genres.Chillhop]],
    [
      Season.Dry,
      [Genres.Latin, Genres.Latino, Genres.Reggae, Genres.Reggaeton],
    ],
    [Season.Rainy, [Genres.Latino, Genres.Bossanova, Genres.Reggaeton]],
    [Season.Polar, [Genres.Ambient, Genres.Chill]],
  ]),
};
