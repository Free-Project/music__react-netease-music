import axios from 'helpers/axios';
import type {
  Type_GetPersonalizedSongListRequest,
  Type_Music,
  Type_MV,
  Type_Banner,
} from './types/personalized';
import type { Type_SongList } from './types/business';

type GetPersonalizedSongListFn = (
  params: Type_GetPersonalizedSongListRequest,
) => Promise<Type_SongList[]>;
type GetPersonalizedNewMusicFn = () => Promise<Type_Music[]>;
type GetPersonalizedMVFn = () => Promise<Type_MV[]>;
type GetBannerFn = () => Promise<Type_Banner[]>;

const getPersonalizedSongList: GetPersonalizedSongListFn = async ({
  limit,
}) => {
  const response = await axios({
    url: '/personalized',
    params: {
      limit,
    },
  });

  return response.result || [];
};

const getPersonalizedNewMusic: GetPersonalizedNewMusicFn = async () => {
  const response = await axios({
    url: '/personalized/newsong',
  });

  return response.result;
};

const getPersonalizedMV: GetPersonalizedMVFn = async () => {
  const response = await axios({
    url: '/personalized/mv',
  });

  return response.result;
};

const getBanner: GetBannerFn = async () => {
  const response = await axios({
    url: '/banner',
    params: {
      type: 0,
    },
  });

  return response.banners;
};

export default {
  getPersonalizedSongList,
  getPersonalizedNewMusic,
  getPersonalizedMV,
  getBanner,
};
