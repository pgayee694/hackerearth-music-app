import { HttpModule, Module } from '@nestjs/common';
import { SpotifyController } from './controllers/spotify.controller';
import { ConfigProvider } from './providers/config.provider';
import { EnvironmentProvider } from './providers/environment.provider';
import { WeatherService } from './services/weather.service';
import { SpotifyService } from './services/spotify.service';
import { VibeController } from './controllers/vibe.controller';
import { VibeService } from './services/vibe.service';
import { WeatherToGenreMapProvider } from './providers/weather-to-genre-map.provider';

@Module({
  imports: [HttpModule],
  controllers: [SpotifyController, VibeController],
  providers: [
    ConfigProvider,
    EnvironmentProvider,
    WeatherService,
    SpotifyService,
    VibeService,
    WeatherToGenreMapProvider,
  ],
})
export class AppModule {}
