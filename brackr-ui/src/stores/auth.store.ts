import { defineStore, acceptHMRUpdate } from 'pinia';
import { api } from 'src/boot/axios';
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
     async login(form: {email: string, password: string}) {
      // Simulate an API call
      return api.post('/auth/login', form)
        .then(({data}) => {
          this.user = data.response.user;
          this.token = data.response.token;
          localStorage.setItem('token', this.token); // Store token in localStorage
          localStorage.setItem('user', JSON.stringify(this.user)); // Store user in localStorage
          console.log('Login successful:', this.user);
          
        })
        .catch((error) => {
          console.error('Login failed:', error);
          throw error; // Re-throw the error for handling in the component
        });
    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAuthStore, import.meta.hot));
}