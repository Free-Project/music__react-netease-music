import axios from 'helpers/axios';
import type { Type_TopListDetail } from './types/topList';

type GetTopListsFn = (t?: string) => Promise<{ list: Type_TopListDetail[] }>;

const getTopListDetail: GetTopListsFn = async () => {
  const response = await axios({
    url: '/toplist/detail',
  });
  return response;
};

export default {
  getTopListDetail,
};
