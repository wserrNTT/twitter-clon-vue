import { defineStore } from 'pinia';
import { trends } from '@/data/trends.json';
import { users } from '@/data/users.json';

// Types
import type { ITrend, IUser } from '@/common/types';

interface sampleData {
  trends: ITrend[];
  users: IUser[];
}

export const useSampleStore = defineStore('samples', {
  state: () => ({ trends: trends, users: users } as sampleData),
  getters: {
    getRandomTrends: (state) => {
      // shufle trends array
      const shuffle = state.trends.sort(() => 0.5 - Math.random());
      // returns five elements
      return shuffle.slice(0, 5);
    },
    getRandomUsers: (state) => {
      // shufle users array
      const shuffle = state.users.sort(() => 0.5 - Math.random());
      // returns five elements
      return shuffle.slice(0, 5);
    }
  }
});
