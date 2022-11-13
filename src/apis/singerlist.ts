import axios from 'helpers/axios';
import type { Type_GetSingerlistsRequest, Artist } from './types/singerList';
import { PAGE_SIZE } from 'constants/pagination';

type GetSingerlistsFn = (
  params: Type_GetSingerlistsRequest,
) => Promise<{ artists: Artist[]; total: number }>;

const getSingerlists: GetSingerlistsFn = async ({
  type,
  area,
  initial,
  limit = PAGE_SIZE,
}) => {
  const response = await axios({
    url: '/artist/list',
    params: {
      type,
      area,
      initial,
      limit,
    },
  });

  return response;
};

export default {
  getSingerlists,
};
