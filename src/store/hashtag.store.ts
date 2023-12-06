import { defineStore } from 'pinia';

// Utils
import { getHashtags } from '@/utils/axios';
import { shuffleArray } from '@/utils';

// Types
import type { IHashtag } from '@/common/types';

interface hashtagData {
  hashtags: IHashtag[];
  loading: boolean;
  error: string;
}

export const useHashtagStore = defineStore('hashtags', {
  state: () =>
    ({
      hashtags: [],
      loading: false,
      error: ''
    } as hashtagData),
  actions: {
    async fetchHashtags() {
      this.loading = true;
      try {
        const { data } = await getHashtags();
        this.hashtags = data;
      } catch (error) {
        this.error = 'Error while fetching data';
      }
      this.loading = false;
    }
  },
  getters: {
    getRandomHashtags: (state) => shuffleArray(state.hashtags).slice(0, 5)
  }
});
