export enum Markets {
  Us = 'US',
  UsIslands = 'UM',
  Canada = 'CA',
}

export enum Genres {
  Acoustic = 'acoustic',
  Afrobeat = 'afrobeat',
  AltRock = 'alt-rock',
  Alternative = 'alternative',
  Ambient = 'ambient',
  Anime = 'anime',
  BlackMetal = 'black-metal',
  Bluegrass = 'bluegrass',
  Blues = 'blues',
  Bossanova = 'bossanova',
  Brazil = 'brazil',
  Breakbeat = 'breakbeat',
  British = 'british',
  Cantopop = 'cantopop',
  ChicagoHouse = 'chicago-house',
  Children = 'children',
  Chill = 'chill',
  Chillhop = 'chillhop',
  Classical = 'classical',
  Club = 'club',
  Comedy = 'comedy',
  Country = 'country',
  Dance = 'dance',
  Dancehall = 'dancehall',
  DeathMetal = 'death-metal',
  DeepHouse = 'deep-house',
  DetroitTechno = 'detroit-techno',
  Disco = 'disco',
  Disney = 'disney',
  DrumAndBass = 'drum-and-bass',
  Dub = 'dub',
  Dubstep = 'dubstep',
  Edm = 'edm',
  Electro = 'electro',
  Electronic = 'electronic',
  Emo = 'emo',
  Folk = 'folk',
  Forro = 'forro',
  French = 'french',
  Funk = 'funk',
  FunkMetal = 'funk-metal',
  Garage = 'garage',
  German = 'german',
  Gospel = 'gospel',
  Goth = 'goth',
  Grindcore = 'grindcore',
  Groove = 'groove',
  Grunge = 'grunge',
  Guitar = 'guitar',
  Happy = 'happy',
  HardRock = 'hard-rock',
  Hardcore = 'hardcore',
  Hardstyle = 'hardstyle',
  HeavyMetal = 'heavy-metal',
  HipHop = 'hip-hop',
  Holidays = 'holidays',
  HonkyTonk = 'honky-tonk',
  House = 'house',
  Idm = 'idm',
  Indian = 'indian',
  Indie = 'indie',
  IndiePop = 'indie-pop',
  Industrial = 'industrial',
  Iranian = 'iranian',
  JDance = 'j-dance',
  JIdol = 'j-idol',
  JPop = 'j-pop',
  JRock = 'j-rock',
  Jazz = 'jazz',
  KPop = 'k-pop',
  Kids = 'kids',
  Latin = 'latin',
  Latino = 'latino',
  Malay = 'malay',
  Mandopop = 'mandopop',
  Metal = 'metal',
  MetalMisc = 'metal-misc',
  Metalcore = 'metalcore',
  MinimalTechno = 'minimal-techno',
  Movies = 'movies',
  Mpb = 'mpb',
  NewAge = 'new-age',
  NewRelease = 'new-release',
  Opera = 'opera',
  Pagode = 'pagode',
  Party = 'party',
  PhilippinesOpm = 'philippines-opm',
  Piano = 'piano',
  Pop = 'pop',
  PopFilm = 'pop-film',
  PostDubstep = 'post-dubstep',
  PowerPop = 'power-pop',
  ProgressiveHouse = 'progressive-house',
  PsychRock = 'psych-rock',
  Punk = 'punk',
  PunkRock = 'punk-rock',
  RNB = 'r-n-b',
  RainyDay = 'rainy-day',
  Rap = 'rap',
  Reggae = 'reggae',
  Reggaeton = 'reggaeton',
  RoadTrip = 'road-trip',
  Rock = 'rock',
  RockNRoll = 'rock-n-roll',
  Rockabilly = 'rockabilly',
  Romance = 'romance',
  Sad = 'sad',
  Salsa = 'salsa',
  Samba = 'samba',
  Sertanejo = 'sertanejo',
  ShowTunes = 'show-tunes',
  SingerSongwriter = 'singer-songwriter',
  Ska = 'ska',
  Sleep = 'sleep',
  Songwriter = 'songwriter',
  Soul = 'soul',
  Soundtracks = 'soundtracks',
  Spanish = 'spanish',
  Study = 'study',
  Summer = 'summer',
  Swedish = 'swedish',
  SynthPop = 'synth-pop',
  Synthwave = 'synthwave',
  Tango = 'tango',
  Techno = 'techno',
  Trance = 'trance',
  TripHop = 'trip-hop',
  Turkish = 'turkish',
  WorkOut = 'work-out',
  WorldMusic = 'world-music',
}

export enum RestrictionReason {
  Market = 'market',
  Product = 'product',
  Explicity = 'explicit',
}

export class QueueSongsRequest {
  constructor(
    public authCode: string,
    public deviceId: string,
    public songUris: string[],
  ) {}
}

export class SpotifyRequest {
  constructor(public authCode: string, public deviceId: string) {}
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
