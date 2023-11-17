import { defineStore } from 'pinia';

// Types
import type { IUser } from '@/common/types';

export const useUserStore = defineStore('userStore', {
  state: () =>
    ({
      username: '',
      isLoggedIn: false
    } as IUser),
  getters: {
    getUsername: (state) => state.username
  },
  actions: {
    toggleLogin() {
      this.isLoggedIn = !this.isLoggedIn;
    }
  }
});
