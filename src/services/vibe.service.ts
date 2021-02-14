import { VibeRequest, QueueResponse } from '@local/shared';
import { Inject, Injectable } from '@nestjs/common';
import { ParameterCalculatorService } from './parameter-calculator.service';
import { Genres, RecommendationsResponse } from 'src/models/spotify';
import { WeatherResponse } from 'src/models/weather-response';
import { WeatherToGenreMap } from '../models/weather-to-genre-map';
import { WeatherToGenreMapToken } from '../providers/weather-to-genre-map.provider';
import { SpotifyService } from './spotify.service';
import { WeatherService } from './weather.service';
import { BingService } from './bing.service';

@Injectable()
export class VibeService {
  public constructor(
    @Inject(WeatherService) private readonly weatherService: WeatherService,
    @Inject(SpotifyService) private readonly spotifyService: SpotifyService,
    @Inject(ParameterCalculatorService)
    private readonly parameterCalculator: ParameterCalculatorService,
    @Inject(BingService) private readonly bingService: BingService,
  ) {}

  public async queue(
    request: VibeRequest,
    isStart = false,
  ): Promise<QueueResponse> {
    const weatherData = await this.weatherService.getCurrentWeather(
      request.location,
    );
    const feature = await this.bingService.getNearbyGeography(request.location);

    const recommendationParameters = this.parameterCalculator.calculate(
      request.hour,
      weatherData,
      feature,
    );

    if (isStart) {
      await this.spotifyService.setDevice(request.token, request.deviceId);
      await this.spotifyService.pause(request.token, request.deviceId);
    }

    const recs = await this.spotifyService.getRecommendations(
      request.token,
      recommendationParameters,
    );

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
