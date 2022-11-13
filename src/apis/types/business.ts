// 1: 单曲, 10: 专辑, 100: 歌手, 1000: 歌单, 1002: 用户, 1004: MV, 1006: 歌词, 1009: 电台, 1014: 视频
export enum TARGET_TYPE {
  MUSIC = 1,
  ALBUM = 10,
  ARTIST = 100,
  SONG_LIST = 1000,
  USER = 1002,
  MV = 1004,
  LYRIC = 1006,
  BROADCASTING_STATION = 1009,
  VIDEO = 1014,
}

export enum MUSIC_STATUS {
  NOT_FOUND = -200,
}

export enum MUSIC_TYPE {
  VIP = 1,
}

export interface Type_Artist {
  albumSize: number;
  id: number;
  img1v1Id: number;
  img1v1Url: string;
  musicSize: number;
  name: string;
  picId: number;
  picUrl: string;
  topicPerson: number;
  alia?: string[];
  alias?: string[];
}

export interface Type_Album {
  artist?: Type_Artist;
  artists?: Type_Artist[];
  blurPicUrl?: string;
  copyrightId?: number;
  description?: string;
  id: number;
  mark?: number;
  name: string;
  picId?: number;
  picUrl: string;
  publishTime?: number;
  size?: number;
  status?: number;
  subType?: string;
  type?: string;
}

export interface Type_MV {
  artistId: number;
  artistName: string;
  artists: Type_Artist[];
  cover: string;
  duration: number;
  id: number;
  mark: number;
  mv: any;
  name: string;
  playCount: number;
  subed: boolean;
}

export interface Type_Music {
  album: Type_Album;
  alias?: string[];
  artists: Type_Artist[];
  copyrightId?: number;
  duration: number;
  fee?: number;
  ftype?: number;
  id: number;
  mark?: number;
  mvid?: number;
  name: string;
  status?: number;
  picUrl?: string;
}

export interface Type_MyMusic {
  id: number;
  name: string;
  artists: Type_Artist[];
  duration: number;
  picUrl?: string;
  album?: Type_Album;
  fee?: number; // 用来判断是否需要vip，fee=1则vip才能听
  status?: number; // 歌曲状态，-200表示资源不存在
}

export interface Type_SongList {
  adType: number;
  backgroundCoverId: number;
  cloudTrackCount: number;
  commentCount: number;
  coverImgUrl: string;
  picUrl?: string;
  createTime: number;
  copywriter?: string;
  creator: {
    avatarUrl: string;
    nickname: string;
    userId: number;
  };
  description: string;
  highQuality: boolean;
  id: number;
  name: string;
  newImported: boolean;
  opRecommend: boolean;
  ordered: boolean;
  playCount: number;
  privacy: number;
  shareCount: number;
  specialType: number;
  status: number;
  subscribed: boolean;
  subscribedCount: number;
  subscribers: [];
  tags: string[];
  trackCount: number;
  trackIds: [];
  trackNumberUpdateTime: number;
  trackUpdateTime: number;
  tracks: Type_SimpleMusic[];
  updateTime: number;
  userId: number;
}

export interface Type_SimpleMusic {
  al: {
    id: number;
    name: string;
    picUrl: string;
  };
  ar: Type_Artist[];
  dt: number;
  id: number;
  name: string;
  publishTime: number;
  fee?: number;
  status?: number;
  artists: [];
}
