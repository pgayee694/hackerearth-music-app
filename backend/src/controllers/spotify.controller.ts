import { Body, Controller, Get, Inject, Post } from '@nestjs/common';
import { Observable } from 'rxjs';
import { WeatherService } from '../services/weather.service';
import {
  Genres,
  QueueSongsRequest,
  RecommendationsRequest,
  RecommendationsResponse,
} from '../models/spotify';
import { SpotifyService } from '../services/spotify.service';

@Controller('spotify')
export class SpotifyController {
  public constructor(
    @Inject(SpotifyService) private readonly spotifyService: SpotifyService,
    @Inject(WeatherService) private readonly weatherService: WeatherService,
  ) {}

  @Get()
  public async test() {
    return this.weatherService.getCurrentWeather({
      lat: 40.843944,
      lon: -97.270203,
    });
  }

  @Get('metadata')
  public getMetadata(): string | null {
    return this.spotifyService.getMetadata();
  }

  @Post('queue')
  public queueSongs(
    @Body() params: QueueSongsRequest,
  ): Observable<RecommendationsResponse> {
    const request: RecommendationsRequest = {
      seed_genres: [Genres.Rock], // TODO: base this off the weather service
      // TODO calculate other parameters
    };

    return this.spotifyService.getRecommendations(params.authCode, request);
  }
}
