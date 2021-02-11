import { Body, Controller, Get, Inject, Post, Query } from '@nestjs/common';
import {
  Genres,
  QueueSongsRequest,
  RecommendationsRequest,
  RecommendationsResponse,
} from '../models/spotify';
import { SpotifyService } from '../services/spotify.service';
import { SpotifyDeviceResponse, SpotifyMetadataResponse } from '@local/shared';

@Controller('spotify')
export class SpotifyController {
  public constructor(
    @Inject(SpotifyService) private readonly spotifyService: SpotifyService,
  ) {}

  @Get('metadata')
  public async getMetadata(): Promise<SpotifyMetadataResponse> {
    return Promise.resolve(this.spotifyService.getMetadata());
  }

  @Get('devices')
  public async getDevices(
    @Query('token') token: string,
  ): Promise<SpotifyDeviceResponse[]> {
    return this.spotifyService.getDevices(token);
  }

  @Post('queue')
  public async queueSongs(
    @Body() params: QueueSongsRequest,
  ): Promise<RecommendationsResponse> {
    const request: RecommendationsRequest = {
      seed_genres: [Genres.Rock], // TODO: base this off the weather service
      // TODO calculate other parameters
    };

    return this.spotifyService.getRecommendations(params.authCode, request);
  }
}
