import axios from 'helpers/axios';
import type { Type_SongList } from './types/business';
import type {
  Type_GetSongListsRequest,
  Type_GetSongListDetailRequest,
  Type_GetSongListCatsResponse,
  Type_Category,
} from './types/songList';
import { PAGE_SIZE } from 'constants/pagination';

type GetSongListsFn = (
  params: Type_GetSongListsRequest,
) => Promise<{ playlists: Type_SongList[]; total: number }>;
type GetSongListDetailFn = (
  params: Type_GetSongListDetailRequest,
) => Promise<Type_SongList>;
type GetSongListCatsFn = () => Promise<Type_GetSongListCatsResponse>;
type GetSongListHotCatsFn = () => Promise<Type_Category[]>;
type GetHighQualitySongListFn = (cat?: string) => Promise<Type_SongList>;
type GetUserSongListFn = (
  uid: number,
) => Promise<{ create: Type_SongList[]; collect: Type_SongList[] }>;

const getSongLists: GetSongListsFn = async ({
  cat,
  order,
  limit = PAGE_SIZE,
  offset,
}) => {
  const response = await axios({
    url: '/top/playlist',
    params: {
      cat,
      order,
      limit,
      offset,
    },
  });

  return response;
};

const getSongListDetail: GetSongListDetailFn = async ({ id }) => {
  const { playlist } = await axios({
    url: '/playlist/detail',
    params: { id },
  });
  return playlist;
};

const getSongListCats: GetSongListCatsFn = async () => {
  const response = await axios({
    url: '/playlist/catlist',
  });

  return response;
};

const getSongListHotCats: GetSongListHotCatsFn = async () => {
  const response = await axios({
    url: '/playlist/hot',
  });

  return response.tags;
};

const getHighQualitySongList: GetHighQualitySongListFn = async (
  cat = '全部',
) => {
  const response = await axios({
    url: '/top/playlist/highquality',
    params: {
      limit: 1,
      cat,
    },
  });

  return response?.playlists?.[0];
};

const getUserSongList: GetUserSongListFn = async (uid) => {
  const response = await axios({
    url: '/user/playlist',
    params: {
      uid,
      limit: PAGE_SIZE,
    },
  });

  const playlist: Type_SongList[] = response.playlist || [];
  const create = playlist.filter(({ creator }) => uid === creator.userId);
  const collect = playlist.filter(({ creator }) => uid !== creator.userId);

  return {
    create,
    collect,
  };
};

export default {
  getSongLists,
  getSongListDetail,
  getSongListCats,
  getSongListHotCats,
  getHighQualitySongList,
  getUserSongList,
};
