import {
  HttpException,
  HttpService,
  HttpStatus,
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { Observable, of } from 'rxjs';
import * as Rx from 'rxjs/operators';
import { EnvironmentToken } from 'src/providers/environment.provider';
import {
  RecommendationsRequest,
  RecommendationsResponse,
} from '../models/spotify';

@Injectable()
export class SpotifyService {
  public constructor(
    @Inject(HttpService) private readonly http: HttpService,
    @Inject(EnvironmentToken) private readonly environment: NodeJS.ProcessEnv,
  ) {}

  public getRecommendations(
    authCode: string,
    seeds: RecommendationsRequest,
  ): Observable<RecommendationsResponse> {
    return this.http
      .get('https://api.spotify.com/v1/recommendations', {
        params: {
          ...seeds,
          seed_genres: seeds.seed_genres?.join(','),
        },
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authCode}`,
        },
      })
      .pipe(
        Rx.map((response) => response.data),
        Rx.catchError((err) => of(err)),
      );
  }

  public getMetadata(): string | null {
    return this.environment.SPOTIFY_CLIENT_ID ?? null;
  }
}
