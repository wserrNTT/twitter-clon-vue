import { defineStore } from 'pinia';
import { trends } from '@/data/trends.json';
import { users } from '@/data/users.json';

// Types
import type { ITrend, IUser } from '@/common/types';

// Utils
import { shuffleArray } from '@/utils';

interface sampleData {
  trends: ITrend[];
  users: IUser[];
}

export const useSampleStore = defineStore('samples', {
  state: () => ({ trends: trends, users: users } as sampleData),
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
      return shuffle.slice(0, 5);
    }
  }
});
