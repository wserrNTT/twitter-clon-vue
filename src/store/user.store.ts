import { defineStore } from 'pinia';

// Types
import type { IUser } from '@/common/types';

export const useUserStore = defineStore('userStore', {
  state: () =>
    ({
      data: {
        username: '',
        displayname: '',
        profilePicture: ''
      },
      isLoggedIn: false
    } as IUser),
  getters: {
    getUsername: (state) => state.data?.username,
    getDisplayname: (state) => state.data?.displayname,
    getProfilePicture: (state) => state.data?.profilePicture,
    getLogged: (state) => state.isLoggedIn
  },
  actions: {
    login(payload: {
      username: string;
      displayname: string;
      profilePicture: string;
    }) {
      this.data = payload;
      this.isLoggedIn = true;
    },
    logout() {
      this.isLoggedIn = false;
      this.data = null;
    }
  }
});
