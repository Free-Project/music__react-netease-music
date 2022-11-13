import axios from 'helpers/axios';
import type { Type_GetAlbumResponse } from './types/album';

type GetAlbumFn = (id: number) => Promise<Type_GetAlbumResponse>;

const getAlbum: GetAlbumFn = async (id) => {
  const response = await axios({
    url: '/album',
    params: {
      id,
    },
  });

  return response;
};

export default {
  getAlbum,
};
