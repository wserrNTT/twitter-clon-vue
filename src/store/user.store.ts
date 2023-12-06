import { defineStore } from 'pinia';

// Utils
import { getUsers } from '@/utils/axios';
import { shuffleArray } from '@/utils';

// Types
import type { IUser } from '@/common/types';

interface usersData {
  users: IUser[];
  loading: boolean;
  error: string;
}

export const useUserStore = defineStore('users', {
  state: () =>
    ({
      users: [],
      loading: false,
      error: ''
    } as usersData),
  actions: {
    async fetchUsers() {
      this.loading = true;
      try {
        const { data } = await getUsers();
        this.users = data;
      } catch (error) {
        this.error = 'Error while fetching data';
      }
      this.loading = false;
    }
  },
  getters: {
    getRandomUsers: (state) => shuffleArray(state.users).slice(0, 3)
  }
});
