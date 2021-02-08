import { HttpService, Inject, Injectable } from '@nestjs/common';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import {
  RecommendationsRequest,
  RecommendationsResponse,
} from '../models/spotify';

@Injectable()
export class SpotifyService {
  constructor(@Inject(HttpService) private http: HttpService) {}

  getRecommendations(
    authCode: string,
    seeds: RecommendationsRequest,
  ): Observable<RecommendationsResponse> {
    const headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + authCode,
    };

    return this.http
      .get('https://api.spotify.com/v1/recommendations', {
        params: {
          ...seeds,
          seed_genres: seeds.seed_genres?.join(','),
        },
        headers: {
          ...headers,
        },
      })
      .pipe(
        map((response) => response.data),
        catchError((err) => of(err)),
      );
  }
}
