import { Body, Controller, Get, Inject, Post } from '@nestjs/common';
import { Coordinate, QueueResponse, VibeRequest } from '@local/shared';
import { VibeService } from '../services/vibe.service';
import { RecommendationsResponse } from 'src/models/spotify';
import { BingService } from 'src/services/bing.service';
import { Feature } from 'src/models/features';

@Controller('vibe')
export class VibeController {
  public constructor(
    @Inject(VibeService) private readonly vibeService: VibeService,
  ) {}

  @Post('start')
  public async start(@Body() request: VibeRequest): Promise<QueueResponse> {
    return this.vibeService.queue(request, true);
  }

  @Post('queue')
  public async queue(@Body() request: VibeRequest): Promise<QueueResponse> {
    return this.vibeService.queue(request, false);
  }
}
