import { Inject, Injectable } from '@nestjs/common';
import { WeatherToGenreMap } from '../models/weather-to-genre-map';
import { WeatherToGenreMapToken } from '../providers/weather-to-genre-map.provider';
import { RecommendationsRequest } from '../models/spotify';
import { WeatherResponse } from '../models/weather-response';
import { shuffleArray } from '../utils/shuffleArray';
import { Season } from '../models/season';
import { SeasonToGenreMapToken } from '../providers/season-to-genre-map.provider';
import { SeasonToGenreMap } from '../models/season-to-genre-map';
import { TimeOfDay } from '../models/time-of-day';
import { TimeOfDayToGenreMapToken } from 'src/providers/time-of-day-to-genre-map.provider';
import { TimeOfDayToGenreMap } from 'src/models/time-of-day-to-genre-map';

@Injectable()
export class ParameterCalculatorService {
  private readonly COMFORTABLE_TEMPERATURE = 22; // like 70F

  public constructor(
    @Inject(WeatherToGenreMapToken)
    private readonly weatherToGenreMap: WeatherToGenreMap,
    @Inject(SeasonToGenreMapToken)
    private readonly seasonToGenreMap: SeasonToGenreMap,
    @Inject(TimeOfDayToGenreMapToken)
    private readonly timeOfDayToGenreMap: TimeOfDayToGenreMap,
  ) {}

  private calculateValence(hour: number): number {
    return (
      Math.log2(hour / 24 + 1) * Math.sin((2 * Math.PI * hour) / 48) * 1 + 0.2
    );
  }

  private calculateTempo(hour: number) {
    return Math.round(
      hour + 180 * (Math.sin((2 * Math.PI * hour) / 48) * 0.3 + 0.55),
    );
  }

  private calculateDanceability(hour: number): number {
    return hour / 24;
  }

  private calculateEnergy(weather: WeatherResponse): number {
    const tempDelta = Math.min(
      1,
      Math.abs(this.COMFORTABLE_TEMPERATURE - weather.main.temp) / 30,
    );

    const windSpeedFactor = Math.min(1, Math.log2(1 + weather.wind.speed / 50));

    return 0.3 + (0.6 * (tempDelta + windSpeedFactor)) / 2;
  }

  private calculateSeasonality(latitude: number): Season {
    const currentMonth = new Date().getMonth();
    const isNorthern = latitude > 0;
    const absoluteLatitude = Math.abs(latitude);

    if (absoluteLatitude > 70) {
      return Season.Polar;
    } else if (absoluteLatitude < 30) {
      if (currentMonth >= 8 || currentMonth < 2) {
        return isNorthern ? Season.Rainy : Season.Dry;
      } else {
        return isNorthern ? Season.Dry : Season.Rainy;
      }
    } else if (currentMonth < 3) {
      return isNorthern ? Season.Winter : Season.Summer;
    } else if (currentMonth < 6) {
      return isNorthern ? Season.Spring : Season.Fall;
    } else if (currentMonth < 9) {
      return isNorthern ? Season.Summer : Season.Winter;
    } else {
      return isNorthern ? Season.Fall : Season.Spring;
    }
  }

  private calculateTimeOfDay(hour: number): TimeOfDay {
    if (hour > 23 || hour < 3) {
      return TimeOfDay.LateNight;
    } else if (hour < 10) {
      return TimeOfDay.Morning;
    } else if (hour < 17) {
      return TimeOfDay.Midday;
    } else {
      return TimeOfDay.Night;
    }
  }

  public calculate(
    hour: number,
    weatherData: WeatherResponse,
  ): Partial<RecommendationsRequest> {
    const possibleGenres = [
      ...weatherData.weather.flatMap(
        (value) => this.weatherToGenreMap.get(value.main)!,
      ),
      ...this.seasonToGenreMap.get(
        this.calculateSeasonality(weatherData.coord.lat),
      )!,
      ...this.timeOfDayToGenreMap.get(this.calculateTimeOfDay(hour))!,
    ];

    const seedGenres = shuffleArray(possibleGenres).slice(0, 3);
    const maxTempo = this.calculateTempo(hour);
    const targetValence = this.calculateValence(hour);

    return {
      limit: 5,
      seed_genres: seedGenres,
      min_energy: this.calculateEnergy(weatherData),
      min_danceability: this.calculateDanceability(hour),
      max_tempo: maxTempo,
      min_tempo: maxTempo - 40,
      max_valence: targetValence + 0.1,
      min_valence: targetValence - 0.04,
    };
  }
}
