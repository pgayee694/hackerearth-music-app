import { HttpModule, Module } from '@nestjs/common';
import { SpotifyController } from './controllers/spotify.controller';
import { ConfigProvider } from './providers/config.provider';
import { EnvironmentProvider } from './providers/environment.provider';
import { WeatherService } from './services/weather.service';
import { SpotifyService } from './services/spotify.service';

@Module({
  imports: [HttpModule],
  controllers: [SpotifyController],
  providers: [ConfigProvider, EnvironmentProvider, WeatherService, SpotifyService],
})
export class AppModule {}
