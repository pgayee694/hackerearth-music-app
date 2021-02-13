import { VibeRequest, QueueResponse } from '@local/shared';
import { Inject, Injectable } from '@nestjs/common';
import { ParameterCalculatorService } from './parameter-calculator.service';
import { Genres, RecommendationsResponse } from 'src/models/spotify';
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
    @Inject(ParameterCalculatorService)
    private readonly parameterCalculator: ParameterCalculatorService,
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

    const recommendationParameters = this.parameterCalculator.calculate(
      request.hour,
      weatherData,
    );

    const { tracks } = await this.spotifyService.getRecommendations(
      request.token,
      recommendationParameters,
    );

    await Promise.all(
      tracks.map((track) =>
        this.spotifyService.queueSong(
          request.token,
          request.deviceId,
          track.uri,
        ),
      ),
    );

    return tracks;
  }

  public async queue(
    request: VibeRequest,
    isStart = false,
  ): Promise<QueueResponse> {
    const weatherData = await this.weatherService.getCurrentWeather(
      request.location,
    );

    if (isStart) {
      await this.spotifyService.setDevice(request.token, request.deviceId);
      await this.spotifyService.pause(request.token, request.deviceId);
    }

    const recs = await this.spotifyService.getRecommendations(request.token, {
      seed_genres: [Genres.Rock],
      target_valence: this.calculateValence(request.hour),
      target_danceability: this.calculateDanceability(request.hour),
      target_energy: this.calculateEnergy(weatherData),
    });

    const uris = recs.tracks.map((track) => track.uri);
    console.log(uris);
    await this.spotifyService.queueSongs(request.token, request.deviceId, uris);

    if (isStart) {
      setTimeout(async () => {
        await this.spotifyService.skipTo(request.token, request.deviceId, uris);
        await this.spotifyService.resume(request.token, request.deviceId);
      }, 1000); //spotify pls queue faster
    }

    return {
      lengths: recs.tracks.map((track) => track.duration_ms),
      totalLength: recs.tracks
        .map((track) => track.duration_ms)
        .reduce((sum, val) => (sum += val), 0),
    };
  }
}
