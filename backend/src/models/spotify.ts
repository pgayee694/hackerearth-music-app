export enum Markets {
  US = 'US',
  US_ISLANDS = 'UM',
  CANADA = 'CA',
}

export enum Genres {
  CLASSICAL = 'classical',
  COUNTRY = 'country',
  ROCK = 'rock',
}

export enum RestrictionReason {
  MARKET = 'market',
  PRODUCT = 'product',
  EXPLICIT = 'explicit',
}

export class QueueSongsRequest {
  authCode: string;
  longitude: number;
  latitude: number;

  constructor(authCode: string, longitude: number, latitude: number) {
    this.authCode = authCode;
    this.longitude = longitude;
    this.latitude = latitude;
  }
}

export interface RecommendationsRequest {
  limit?: number;
  market?: Markets[];
  seed_artists?: string[];
  seed_genres?: Genres[];
  seed_tracks?: string[];
  min_acousticness?: number;
  max_acousticness?: number;
  target_acousticness?: number;
  min_danceability?: number;
  max_danceability?: number;
  target_danceability?: number;
  min_duration_ms?: number;
  max_duration_ms?: number;
  target_duration_ms?: number;
  min_energy?: number;
  max_energy?: number;
  target_energy?: number;
  min_instrumentalness?: number;
  max_instrumentalness?: number;
  target_instrumentalness?: number;
  min_key?: number;
  max_key?: number;
  target_key?: number;
  min_liveness?: number;
  max_liveness?: number;
  target_liveness?: number;
  min_loudness?: number;
  max_loudness?: number;
  target_loudness?: number;
  min_mode?: number;
  max_mode?: number;
  target_mode?: number;
  min_popularity?: number;
  max_popularity?: number;
  target_popularity?: number;
  min_speechiness?: number;
  max_speechiness?: number;
  target_speechiness?: number;
  min_tempo?: number;
  max_tempo?: number;
  target_tempo?: number;
  min_time_signature?: number;
  max_time_signature?: number;
  target_time_signature?: number;
  min_valence?: number;
  max_valence?: number;
  target_valence?: number;
}

export interface RecommendationsResponse {
  seeds: RecommendationSeed[];
  tracks: SimplifiedTrack[];
}

export interface RecommendationSeed {
  afterFilteringSize: number;
  afterRelinkingSize: number;
  href: string;
  id: string;
  initialPoolSize: number;
  type: string;
}

export interface SimplifiedTrack {
  artists: SimplifiedArtistObject[];
  available_markets: string[];
  disc_number: number;
  duration_ms: number;
  explicit: boolean;
  external_urls: ExternalUrl;
  href: string;
  is_local: boolean;
  is_playable: boolean;
  linked_from: LinkedTrackObject;
  name: string;
  preview_url: string;
  restrictions: TrackRestrictions;
  track_number: number;
  type: string;
  uri: string;
}

export interface SimplifiedArtistObject {
  external_urls: ExternalUrl;
  href: string;
  id: string;
  name: string;
  type: string;
  uri: string;
}

export interface LinkedTrackObject {
  external_urls: ExternalUrl;
  href: string;
  id: string;
  type: string;
  uri: string;
}

export interface TrackRestrictions {
  reason: RestrictionReason;
}

export interface ExternalUrl {
  spotify: string;
}
