export interface Type_User {
  anonym: number;
  authStatus: number;
  avatarUrl: string;
  nickname: string;
  userId: number;
  userType: number;
  vipType: number;
}

export interface Type_Reply {
  beRepliedCommentId: number;
  content: string;
  status: number;
  user: Type_User;
}

export interface Type_Comment {
  beReplied: Type_Reply[];
  commentId: number;
  commentLocationType: number;
  content: string;
  liked: boolean;
  likedCount: number;
  parentCommentId: number;
  status: number;
  time: number;
  user: Type_User;
}
