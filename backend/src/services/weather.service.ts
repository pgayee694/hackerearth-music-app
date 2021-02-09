import { HttpService, Inject, Injectable } from '@nestjs/common';
import { of } from 'rxjs';
import * as Rx from 'rxjs/operators';
import { Coordinate } from '@local/shared';
import { Config } from '../models/config';
import { ConfigToken } from '../providers/config.provider';
import { EnvironmentToken } from '../providers/environment.provider';
import { WeatherResponse } from '../models/weather-response';

@Injectable()
export class WeatherService {
  public constructor(
    @Inject(EnvironmentToken) private readonly environment: NodeJS.ProcessEnv,
    @Inject(ConfigToken) private readonly config: Config,
    @Inject(HttpService) private readonly http: HttpService,
  ) {}

  public async getCurrentWeather(
    coordinate: Coordinate,
  ): Promise<WeatherResponse> {
    return this.http
      .get<WeatherResponse>(this.config.weatherApi, {
        params: {
          appId: this.environment.WEATHER_API_KEY,
          lat: coordinate.lat,
          lon: coordinate.lon,
          units: 'metric',
        },
      })
      .pipe(
        Rx.map((response) => response.data),
        Rx.catchError((err) => of({ err: err.toString() } as any)),
      )
      .toPromise();
  }
}
