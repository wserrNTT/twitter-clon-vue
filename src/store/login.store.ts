import { defineStore } from 'pinia';

// Types
import type { ILogin, IUser } from '@/common/types';

const defaultUser: IUser = {
  _id: '',
  displayName: '',
  userName: '',
  followers: [],
  following: [],
  profilePicture: ''
};

export const useLoginStore = defineStore('loginStore', {
  state: () =>
    ({
      data: defaultUser,
      isLoggedIn: false,
      error: ''
    } as ILogin),
  actions: {
    setError(payload: string) {
      this.error = payload;
    },
    login(payload: IUser) {
      this.data = payload;
      this.isLoggedIn = true;
      this.error = '';
    },
    logout() {
      this.data = defaultUser;
      this.isLoggedIn = false;
      this.error = '';
    }
  }
});
