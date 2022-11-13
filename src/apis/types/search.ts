import {
  Type_Album,
  Type_Artist,
  Type_Music,
  Type_MV,
  TARGET_TYPE,
} from './business';

export interface Type_SearchHot {
  first: string;
  iconType: number;
  second: number;
}

export interface Type_SearchSuggestRequest {
  keywords: string;
}

export interface Type_SearchSuggestType {
  albums: 'albums';
  artists: 'artists';
  mvs: 'mvs';
  songs: 'songs';
}

export type TypeKey = 'artists' | 'albums' | 'mvs' | 'songs';

export interface Type_SearchSuggestResponse {
  order: TypeKey[];
  albums: Type_Album[];
  artists: Type_Artist[];
  mvs: Type_MV[];
  songs: Type_Music[];
}

export interface Type_SearchRequest {
  keywords: string;
  type?: TARGET_TYPE;
  limit?: number;
  offset?: number;
}
