import { Body, Controller, Inject, Post } from '@nestjs/common';
import { VibeRequest } from '@local/shared';
import { VibeService } from '../services/vibe.service';

@Controller('vibe')
export class VibeController {
  public constructor(
    @Inject(VibeService) private readonly vibeService: VibeService,
  ) {}

  @Post()
  public async vibe(@Body() request: VibeRequest): Promise<any> {
    return this.vibeService.queueTracks(request);
  }
}
