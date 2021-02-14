import { Body, Controller, Inject, Post } from '@nestjs/common';
import { QueueResponse, VibeRequest } from '@local/shared';
import { VibeService } from '../services/vibe.service';

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
