import { Provider } from '@nestjs/common';
import { SeasonToGenreMap } from '../models/season-to-genre-map';
import { Genres } from '../models/spotify';
import { Season } from '../models/season';

export const SeasonToGenreMapToken = Symbol('SeasonToGenreMapToken');

export const SeasonToGenreMapProvider: Provider<SeasonToGenreMap> = {
  provide: SeasonToGenreMapToken,
  useValue: new Map([
    [Season.Spring, [Genres.IndiePop, Genres.Blues, Genres.Acoustic]],
    [Season.Summer, [Genres.Summer, Genres.Reggae, Genres.Latino]],
    [Season.Fall, [Genres.Funk, Genres.Jazz, Genres.Groove]],
    [Season.Winter, [Genres.Industrial, Genres.Metal, Genres.Electro]],
    [
      Season.Dry,
      [Genres.Latin, Genres.Latino, Genres.Reggae, Genres.Reggaeton],
    ],
    [Season.Rainy, [Genres.Latino, Genres.Bossanova, Genres.Reggaeton]],
    [Season.Polar, [Genres.Ambient, Genres.Chill]],
  ]),
};
