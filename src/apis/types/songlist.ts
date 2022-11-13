enum ORDER {
  HOT = 'hot',
  NEW = 'new',
}

export interface Type_GetSongListsRequest {
  cat?: string;
  order?: ORDER;
  limit?: number;
  offset?: number;
}

export interface Type_GetSongListDetailRequest {
  id: number | string;
}

export interface Type_Category {
  activity: boolean;
  category: number;
  hot: boolean;
  name: string;
  type: number;
}

export interface Type_GetSongListCatsResponse {
  all: Type_Category;
  categories: Type_Dictionary<string>;
  sub: Type_Category[];
}
