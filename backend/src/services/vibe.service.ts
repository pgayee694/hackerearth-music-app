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
import * as Rx from 'rxjs/operators';
import { of } from 'rxjs';

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
    console.log(request);

    const weatherData = await this.weatherService.getCurrentWeather(
      request.location,
    );
    const feature = await this.bingService.getNearbyGeography(request.location);

    console.log('got weather and geo');

    const recommendationParameters = this.parameterCalculator.calculate(
      request.hour,
      weatherData,
      feature,
    );

    console.log(recommendationParameters);

    if (isStart) {
      console.log('about to set');
      await this.spotifyService.setDevice(request.token, request.deviceId);
      console.log('about to pause');
      await this.spotifyService.pause(request.token, request.deviceId);
    }

    console.log('getting recs');

    const recs = await this.spotifyService.getRecommendations(
      request.token,
      recommendationParameters,
    );

    console.log('got recommendations');

    const uris = recs.tracks.map((track) => track.uri);
    console.log(uris);
    if (uris.length > 0) {
      await this.spotifyService.queueSongs(
        request.token,
        request.deviceId,
        uris,
      );
    }

    console.log('queued');

    if (isStart) {
      setTimeout(async () => {
        console.log('skipping');
        await this.spotifyService.skipTo(request.token, request.deviceId, uris);
        await this.spotifyService.resume(request.token, request.deviceId);
      }, 1000); //spotify pls queue faster
    }

    return {
      lengths: recs.tracks.map((track) => track.duration_ms),
      totalLength: recs.tracks
        .map((track) => track.duration_ms)
        .reduce((sum, val) => (sum += val), 0),
      uris: uris,
    };
  }
}
