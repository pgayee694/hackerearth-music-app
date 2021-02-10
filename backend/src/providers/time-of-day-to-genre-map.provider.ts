import { Provider } from '@nestjs/common';
import { TimeOfDayToGenreMap } from '../models/time-of-day-to-genre-map';
import { Genres } from '../models/spotify';
import { TimeOfDay } from '../models/time-of-day';

export const TimeOfDayToGenreMapToken = Symbol('TimeOfDayToGenreMapToken');

export const TimeOfDayToGenreMapProvider: Provider<TimeOfDayToGenreMap> = {
  provide: TimeOfDayToGenreMapToken,
  useValue: new Map([
    [TimeOfDay.Morning, [Genres.Acoustic, Genres.Chill, Genres.Pop]],
    [TimeOfDay.Midday, [Genres.PowerPop, Genres.WorkOut, Genres.Party]],
    [TimeOfDay.Night, [Genres.Chill, Genres.Ambient, Genres.Trance]],
    [
      TimeOfDay.LateNight,
      [Genres.Club, Genres.Dance, Genres.Techno, Genres.Edm],
    ],
  ]),
};
