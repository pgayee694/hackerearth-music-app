import { Coordinate } from '@local/shared';
import { HttpService, Inject, Injectable } from '@nestjs/common';
import { Config } from '../models/config';
import { Feature } from '../models/features';
import { ConfigToken } from '../providers/config.provider';
import { EnvironmentToken } from '../providers/environment.provider';
import * as Rx from 'rxjs/operators';

@Injectable()
export class BingService {
  public constructor(
    @Inject(EnvironmentToken) private readonly environment: NodeJS.ProcessEnv,
    @Inject(ConfigToken) private readonly config: Config,
    @Inject(HttpService) private readonly http: HttpService,
  ) {}

  public async getNearbyGeography(location: Coordinate): Promise<Feature> {
    return await this.http
      .get(
        `${this.config.bingApi}/locationRecog/${location.lat},${location.lon}`,
        {
          params: {
            key: this.environment.BING_API_KEY,
            output: 'json',
            r: 0.5,
            distanceUnit: 'mi',
            includeEntityTypes: 'naturalPOI',
          },
        },
      )
      .pipe(
        Rx.map((result) => {
          if (
            result.data.resourceSets.length !== 0 &&
            result.data.resourceSets[0].resources.length !== 0 &&
            result.data.resourceSets[0].resources[0].naturalPOIAtLocation
              .length !== 0
          ) {
            return result.data.resourceSets[0].resources[0]
              .naturalPOIAtLocation[0].type as Feature;
          } else {
            return Feature.Plain;
          }
        }),
      )
      .toPromise();
  }
}
