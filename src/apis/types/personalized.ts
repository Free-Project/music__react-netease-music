import { Type_Artist } from './business';

export interface Type_GetPersonalizedSongListRequest {
  limit?: number;
}

export interface Type_SongList {
  alg: string;
  canDislike: boolean;
  copywriter: string;
  highQuality: boolean;
  id: number;
  name: string;
  picUrl: string;
  playCount: number;
  trackCount: number;
  trackNumberUpdateTime: number;
  type: number;
}

export interface Type_MusicSong {
  artists: Type_Artist[];
  duration: number;
}

export interface Type_Music {
  alg: string;
  canDislike: boolean;
  id: number;
  name: string;
  picUrl: string;
  song: Type_MusicSong;
}

export interface Type_MV {
  alg: string;
  artistId: number;
  artistName: string;
  canDislike: boolean;
  copywriter: string;
  duration: number;
  id: number;
  name: string;
  picUrl: string;
  playCount: number;
  subed: boolean;
  type: number;
}

export interface Type_Banner {
  exclusive: boolean;
  imageUrl: string;
  targetId: number;
  targetType: number;
  titleColor: string;
  typeTitle: string;
  url: string;
}
