import { HttpService, Inject, Injectable } from '@nestjs/common';
import { SpotifyMetadataResponse, SpotifyDeviceResponse } from '@local/shared';
import { of } from 'rxjs';
import * as Rx from 'rxjs/operators';
import { EnvironmentToken } from '../providers/environment.provider';
import {
  RecommendationsRequest,
  RecommendationsResponse,
  SimplifiedTrack,
} from '../models/spotify';
import { ConfigToken } from '../providers/config.provider';
import { Config } from '../models/config';
import { response } from 'express';

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
            limit: 5,
          },
        },
      )
      .toPromise();

    return data;
  }

  public async resetQueue(token: string, deviceId: string): Promise<void> {
    let isPlaying: boolean = await this.http
      .get<{ is_playing: boolean }>(`${this.config.spotifyApi}/me/player`, {
        headers: this.createAuthHeaders(token),
      })
      .pipe(Rx.map((response) => response.data.is_playing))
      .toPromise<boolean>();

    while (isPlaying) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      isPlaying = await this.http
        .post<boolean>(
          `${this.config.spotifyApi}/me/player/next`,
          {},
          {
            headers: this.createAuthHeaders(token),
            params: {
              device_id: deviceId,
            },
          },
        )
        .pipe(
          Rx.concatMap(() =>
            this.http.get<{ is_playing: boolean }>(
              `${this.config.spotifyApi}/me/player`,
              {
                headers: this.createAuthHeaders(token),
              },
            ),
          ),
          Rx.map((response) => response.data.is_playing),
          Rx.catchError(() => of([] as any)),
        )
        .toPromise();
    }
  }

  public async setDevice(token: string, deviceId: string): Promise<void> {
    await this.http
      .put(
        `${this.config.spotifyApi}/me/player`,
        {
          device_ids: [deviceId],
        },
        {
          headers: this.createAuthHeaders(token),
        },
      )
      .toPromise();
  }

  public async skip(token: string, deviceId: string): Promise<void> {
    await this.http
      .post(
        `${this.config.spotifyApi}/me/player/next`,
        {},
        {
          headers: this.createAuthHeaders(token),
          params: {
            device_id: deviceId,
          },
        },
      )
      .pipe(Rx.catchError(() => of([])))
      .toPromise();
  }

  public async resume(token: string, deviceId: string): Promise<void> {
    await this.http
      .put(
        `${this.config.spotifyApi}/me/player/play`,
        {},
        {
          headers: this.createAuthHeaders(token),
          params: {
            device_id: deviceId,
          },
        },
      )
      .pipe(Rx.catchError(() => of([])))
      .toPromise();
  }

  public async queueSongs(
    token: string,
    deviceId: string,
    songUris: string[],
  ): Promise<void> {
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    songUris.forEach(async (uri) => {
      await this.http
        .post(
          `${this.config.spotifyApi}/me/player/queue`,
          {},
          {
            headers: this.createAuthHeaders(token),
            params: {
              uri: uri,
              device_id: deviceId,
            },
          },
        )
        .pipe(Rx.map(async (response) => console.log(response.status)))
        .toPromise();
    });
  }

  public getMetadata(): SpotifyMetadataResponse {
    return { clientId: this.environment.SPOTIFY_CLIENT_ID ?? null };
  }
}
