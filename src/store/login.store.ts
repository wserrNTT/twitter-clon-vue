import { defineStore } from 'pinia';

// Types
import type { ILogin, IUser } from '@/common/types';

export const useLoginStore = defineStore('loginStore', {
  state: () =>
    ({
      data: null,
      isLoggedIn: false
    } as ILogin),
  getters: {
    getUsername: (state) => state.data?.username,
    getDisplayname: (state) => state.data?.displayname,
    getProfilePicture: (state) => state.data?.profilePicture,
    getLogged: (state) => state.isLoggedIn
  },
  actions: {
    login(payload: IUser) {
      this.data = payload;
      this.isLoggedIn = true;
    },
    logout() {
      this.isLoggedIn = false;
      this.data = null;
    }
  }
});
