import { VibeRequest } from '@local/shared';
import { Inject, Injectable } from '@nestjs/common';
import { ParameterCalculatorService } from './parameter-calculator.service';
import { SpotifyService } from './spotify.service';
import { WeatherService } from './weather.service';

@Injectable()
export class VibeService {
  public constructor(
    @Inject(WeatherService) private readonly weatherService: WeatherService,
    @Inject(SpotifyService) private readonly spotifyService: SpotifyService,
    @Inject(ParameterCalculatorService)
    private readonly parameterCalculator: ParameterCalculatorService,
  ) {}

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
}
