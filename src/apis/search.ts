import axios from 'helpers/axios';
import type {
  Type_SearchHot,
  Type_SearchSuggestRequest,
  Type_SearchSuggestResponse,
  Type_SearchRequest,
} from './types/search';
import { TARGET_TYPE } from './types/business';
import { PAGE_SIZE } from 'constants/pagination';

type SearchHotFn = () => Promise<Type_SearchHot[]>;
type SearchSuggestFn = (
  params: Type_SearchSuggestRequest,
) => Promise<Type_SearchSuggestResponse>;
type SearchFn = (params: Type_SearchRequest) => Promise<any>;

const searchHot: SearchHotFn = async () => {
  const response = await axios({
    url: '/search/hot',
  });

  return response?.result?.hots;
};

const searchSuggest: SearchSuggestFn = async ({ keywords }) => {
  const response = await axios({
    url: '/search/suggest',
    params: {
      keywords,
    },
  });

  return response.result;
};

const search: SearchFn = async ({
  keywords,
  type = TARGET_TYPE.MUSIC,
  limit = PAGE_SIZE,
  offset = 0,
}) => {
  const response = await axios({
    url: '/search',
    params: {
      keywords,
      type,
      limit,
      offset,
    },
  });

  return response.result;
};

export default {
  searchHot,
  searchSuggest,
  search,
};
