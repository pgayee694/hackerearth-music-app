import { Body, Controller, Get, Inject, Post, Query } from '@nestjs/common';
import {
  Genres,
  QueueSongsRequest,
  RecommendationsRequest,
  RecommendationsResponse,
  SpotifyRequest,
} from '../models/spotify';
import { SpotifyService } from '../services/spotify.service';
import {
  PlayerStatus,
  SpotifyDeviceResponse,
  SpotifyMetadataResponse,
  SpotifyStatusRequest,
} from '@local/shared';

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

  @Post('status')
  public async setStatus(@Body() params: SpotifyStatusRequest): Promise<void> {
    switch (params.status) {
      case PlayerStatus.Start:
        await this.spotifyService.resume(params.token, params.deviceId);
        break;
      case PlayerStatus.Pause:
        await this.spotifyService.pause(params.token, params.deviceId);
        break;
      case PlayerStatus.Skip:
        await this.spotifyService.skip(params.token, params.deviceId);
        break;
      case PlayerStatus.Back:
        await this.spotifyService.back(params.token, params.deviceId);
        break;
      default:
        break;
    }
  }

  @Post('queue')
  public async queueSongs(@Body() params: QueueSongsRequest): Promise<void> {
    this.spotifyService.queueSongs(
      params.authCode,
      params.deviceId,
      params.songUris,
    );
  }

  @Post('reset')
  public async resetQueue(@Body() params: SpotifyRequest): Promise<void> {
    this.spotifyService.resetQueue(params.authCode, params.deviceId);
  }

  @Post('resume')
  public async resume(@Body() params: SpotifyRequest): Promise<void> {
    this.spotifyService.resume(params.authCode, params.deviceId);
  }

  @Post('skip')
  public async skip(@Body() params: SpotifyRequest): Promise<void> {
    this.spotifyService.skip(params.authCode, params.deviceId);
  }
}
