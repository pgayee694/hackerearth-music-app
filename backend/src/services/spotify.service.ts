import { HttpService, Inject, Injectable } from '@nestjs/common';
import { SpotifyMetadataResponse, SpotifyDeviceResponse } from '@local/shared';
import { of } from 'rxjs';
import * as Rx from 'rxjs/operators';
import { EnvironmentToken } from '../providers/environment.provider';
import {
  RecommendationsRequest,
  RecommendationsResponse,
} from '../models/spotify';
import { ConfigToken } from '../providers/config.provider';
import { Config } from '../models/config';

@Injectable()
export class SpotifyService {
  public constructor(
    @Inject(HttpService) private readonly http: HttpService,
    @Inject(ConfigToken) private readonly config: Config,
    @Inject(EnvironmentToken) private readonly environment: NodeJS.ProcessEnv,
  ) {}

  private createAuthHeaders(token: string) {
    return {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    };
  }

  public async getDevices(token: string): Promise<SpotifyDeviceResponse[]> {
    return this.http
      .get<{ devices: SpotifyDeviceResponse[] }>(
        `${this.config.spotifyApi}/me/player/devices`,
        {
          headers: this.createAuthHeaders(token),
        },
      )
      .pipe(
        Rx.map((response) => response.data.devices ?? []),
        Rx.catchError(() => of([])),
      )
      .toPromise();
  }

  public async queueSong(
    token: string,
    deviceId: string,
    trackId: string,
  ): Promise<any> {
    return this.http
      .post(`${this.config.spotifyApi}/me/player/queue`, null, {
        headers: this.createAuthHeaders(token),
        params: {
          device_id: deviceId,
          uri: trackId,
        },
      })
      .toPromise();
  }

  public async getRecommendations(
    token: string,
    seeds: RecommendationsRequest,
  ): Promise<RecommendationsResponse> {
    const { data } = await this.http
      .get<RecommendationsResponse>(
        `${this.config.spotifyApi}/recommendations`,
        {
          headers: this.createAuthHeaders(token),
          params: {
            ...seeds,
            seed_genres: seeds.seed_genres?.join(','),
          },
        },
      )
      .toPromise();

    return data;
  }

  public getMetadata(): SpotifyMetadataResponse {
    return { clientId: this.environment.SPOTIFY_CLIENT_ID ?? null };
  }
}
