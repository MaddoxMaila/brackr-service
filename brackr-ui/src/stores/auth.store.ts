import { defineStore, acceptHMRUpdate } from 'pinia';
import type { User } from 'src/components/models';

interface AuthStateModel {
    user: User | null,
    token: string
}

export const useAuthStore = defineStore('auth.store', {
  state: () => ({
    user: null,
    token: ''
  } as AuthStateModel),

  getters: {
    authUser: (state) => state.user,
  },

  actions: {
    login() {
    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAuthStore, import.meta.hot));
}