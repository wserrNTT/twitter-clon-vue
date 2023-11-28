export interface ILogin {
  data: IUser | null;
  isLoggedIn: boolean;
}

export interface IUser {
  id: number;
  username: string;
  displayname: string;
  profilePicture: string;
  following: number;
  followers: number;
  isFollowing?: boolean;
}

export interface ITrend {
  name: string;
  url: string;
  tweet_volume: number | null;
}

export interface ITweet {
  id: number;
  author: IUser;
  timestamp: Date;
  body: string;
  picture?: string;
  comments: number;
  reposts: number;
  likes: number;
  views: number;
}

export interface rawTweet {
  id: number;
  authorID: number;
  timestamp: string;
  body: string;
  picture?: string;
  comments: number;
  reposts: number;
  likes: number;
  views: number;
}
