import { HttpModule, Module } from '@nestjs/common';
import { SongController } from './controllers/song.controller';
import { ConfigProvider } from './providers/config.provider';
import { EnvironmentProvider } from './providers/environment.provider';
import { WeatherService } from './services/weather.service';

@Module({
  imports: [HttpModule],
  controllers: [SongController],
  providers: [ConfigProvider, EnvironmentProvider, WeatherService],
})
export class AppModule {}
