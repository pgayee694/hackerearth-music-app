import { VibeRequest } from '@local/shared';
import { Inject, Injectable } from '@nestjs/common';
import { WeatherResponse } from 'src/models/weather-response';
import { WeatherToGenreMap } from '../models/weather-to-genre-map';
import { WeatherToGenreMapToken } from '../providers/weather-to-genre-map.provider';
import { SpotifyService } from './spotify.service';
import { WeatherService } from './weather.service';

@Injectable()
export class VibeService {
  private readonly COMFORTABLE_TEMPERATURE = 22; // like 70F

  public constructor(
    @Inject(WeatherService) private readonly weatherService: WeatherService,
    @Inject(SpotifyService) private readonly spotifyService: SpotifyService,
    @Inject(WeatherToGenreMapToken)
    private readonly weatherToGenreMap: WeatherToGenreMap,
  ) {}

  private calculateValence(hour: number): number {
    return Math.sin((2 * Math.PI * hour) / 48) * 0.6 + 0.3;
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

  public async queueTracks(request: VibeRequest): Promise<any> {
    const weatherData = await this.weatherService.getCurrentWeather(
      request.location,
    );

    const possibleGenres = weatherData.weather.flatMap(
      (value) => this.weatherToGenreMap.get(value.main)!,
    );

    return this.spotifyService.getRecommendations(request.token, {
      seed_genres: possibleGenres,
      target_valence: this.calculateValence(request.hour),
      target_danceability: this.calculateDanceability(request.hour),
      target_energy: this.calculateEnergy(weatherData),
    });
  }
}
