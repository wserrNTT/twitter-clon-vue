import { defineStore } from 'pinia';

export interface CounterState {
  count: number;
}

export const useCounterStore = defineStore('store', {
  state: () =>
    ({
      count: 0
    } as CounterState),
  getters: {
    getCount: (state) => state.count
  },
  actions: {
    incrementBy(payload: number) {
      this.count += payload;
    },
    increment() {
      this.incrementBy(1);
    }
  }
});
