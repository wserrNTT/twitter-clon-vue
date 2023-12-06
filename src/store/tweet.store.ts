import { defineStore } from 'pinia';

// Utils
import { getTweets } from '@/utils/axios';

// Types
import type { ITweet } from '@/common/types';

interface tweetsData {
  tweets: ITweet[];
  loading: boolean;
  error: string;
}

export const useTweetStore = defineStore('tweets', {
  state: () =>
    ({
      tweets: [],
      loading: false,
      error: ''
    } as tweetsData),
  actions: {
    async fetchTweets() {
      this.loading = true;
      try {
        const { data } = await getTweets();
        this.tweets = data;
      } catch (error) {
        this.error = 'Error while fetching data';
      }
      this.loading = false;
    }
  }
});
