import { Controller, Get, Inject } from '@nestjs/common';
import { WeatherService } from 'src/services/weather.service';

@Controller('/song')
export class SongController {
  public constructor(
    @Inject(WeatherService) private readonly weatherService: WeatherService,
  ) {}

  @Get()
  public async test() {
    return this.weatherService.getCurrentWeather({
      lat: 40.843944,
      lon: -97.270203,
    });
  }
}
