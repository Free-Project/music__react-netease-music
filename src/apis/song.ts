import axios from 'helpers/axios';
import { createMyMusicFromSimpleMusic } from 'helpers/business';
import type {
  Type_MyMusic,
  Type_Music,
  Type_SongList,
  Type_SimpleMusic,
} from 'apis/types/business';
import type { Type_Comment } from 'apis/types/comment';

export enum SONG_TYPE {
  ALL = 0,
  CHINESE = 7,
  EU_USA = 96,
  JAPANESE = 8,
  KOREAN = 16,
}

interface Type_Params {
  id: number;
  offset?: number;
  limit?: number;
}

interface Type_GetCommentsResponse {
  comments: Type_Comment[];
  hotComments?: Type_Comment[];
  isMusician: boolean;
  more: boolean;
  moreHot: boolean;
  topComments: Type_Comment[];
  total: number;
  userId: number;
}

type GetSongDetailFn = (ids: number[]) => Promise<Type_MyMusic[]>;
type GetTopSongsFn = (type?: SONG_TYPE) => Promise<Type_MyMusic[]>;
type GetRecommendSongsFn = () => Promise<Type_Music[]>;
type GetSimType_SongListFn = (params: Type_Params) => Promise<Type_SongList[]>;
type GetgetSimiSongFn = (params: Type_Params) => Promise<Type_Music[]>;
type GetCommentsFn = (params: Type_Params) => Promise<Type_GetCommentsResponse>;
type GetgetLyricFn = (
  id: number,
) => Promise<{ lyric: string; offset: number; version: number }>;

const getSongDetail: GetSongDetailFn = async (ids) => {
  const response = await axios({
    url: '/song/detail',
    params: {
      ids: ids.join(','),
    },
  });

  return response?.songs.map((item: Type_SimpleMusic) =>
    createMyMusicFromSimpleMusic({ ...item, status: (item as any).st }),
  );
};

const getTopSongs: GetTopSongsFn = async (type = SONG_TYPE.ALL) => {
  const response = await axios({
    url: '/top/song',
    params: {
      type,
    },
  });

  return response.data;
};

const getRecommendSongs: GetRecommendSongsFn = async () => {
  const response = await axios({
    url: '/recommend/songs',
    params: {
      timestamp: Date.now(),
    },
  });

  return (
    response.data?.dailySongs?.map((item: Type_SimpleMusic) =>
      createMyMusicFromSimpleMusic(item),
    ) || []
  );
};

const getSimType_SongList: GetSimType_SongListFn = async ({
  id,
  offset,
  limit,
}) => {
  const response = await axios({
    url: '/simi/playlist',
    params: {
      id,
      offset,
      limit,
    },
  });

  return response.playlists;
};

const getSimiSong: GetgetSimiSongFn = async ({ id, offset, limit }) => {
  const response = await axios({
    url: '/simi/song',
    params: {
      id,
      offset,
      limit,
    },
  });

  return response.songs;
};

const getComments: GetCommentsFn = async ({ id, offset, limit }) => {
  const response = await axios({
    url: '/comment/music',
    params: {
      id,
      offset,
      limit,
    },
  });

  return response;
};

const getLyric: GetgetLyricFn = async (id) => {
  const response = await axios({
    url: '/lyric',
    params: {
      id,
    },
  });

  return response.lrc;
};

export default {
  getSongDetail,
  getTopSongs,
  getRecommendSongs,
  getSimType_SongList,
  getSimiSong,
  getComments,
  getLyric,
};
