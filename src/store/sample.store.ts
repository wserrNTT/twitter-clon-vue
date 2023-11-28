import { defineStore } from 'pinia';
import { trends } from '@/data/trends.json';
import { users } from '@/data/users.json';
import { tweets } from '@/data/tweets.json';

import { loadTweets } from '@/utils';

// Types
import type { ITrend, ITweet, IUser } from '@/common/types';

// Utils
import { shuffleArray } from '@/utils';

interface sampleData {
  trends: ITrend[];
  users: IUser[];
  tweets: ITweet[];
}

export const useSampleStore = defineStore('samples', {
  state: () =>
    ({
      trends: trends,
      users: users,
      tweets: loadTweets(tweets, users)
    } as sampleData),
  getters: {
    getRandomTrends: (state) => {
      // shufle trends array
      const shuffle = shuffleArray(state.trends);
      // returns five elements
      return shuffle.slice(0, 5);
    },
    getRandomUsers: (state) => {
      // shufle users array
      const shuffle = shuffleArray(state.users);
      // returns five elements
      return shuffle.slice(0, 3);
    },
    getTweets: (state) => state.tweets
  }
});
