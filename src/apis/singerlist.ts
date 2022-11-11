import axios from 'helpers/axios';
import type { IGetSingerlistsRequest, Artist } from './types/singerlist';
import { PAGE_SIZE } from 'constants/pagination';

type GetSingerlistsFn = (
  params: IGetSingerlistsRequest,
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
