import { defineBoot } from '#q-app/wrappers';
import axios, { type AxiosInstance } from 'axios';

declare module 'vue' {
  interface ComponentCustomProperties {
    $axios: AxiosInstance;
    $api: AxiosInstance;
  }
}

// Be careful when using SSR for cross-request state pollution
// due to creating a Singleton instance here;
// If any client changes this (global) instance, it might be a
// good idea to move this instance creation inside of the
// "export default () => {}" function below (which runs individually
// for each client)
const api = axios.create({ baseURL: 'http://172.29.64.1:2828/v1' });

localStorage.setItem('apiKey', 'dc234eee13c48ce144c06a5ce7db1e85736d61727470726f40676d61696c2e636f6d')

// Add request interceptor to include token and api key headers
api.interceptors.request.use((config) => {
  // Get token and apiKey from localStorage or another secure place
  const apiKey = localStorage.getItem('apiKey');

  if (apiKey) {
    config.headers['x-access-key'] = apiKey;
  }
  
  if (
    config.url &&
    config.url.toLowerCase().includes('/login')
  ) {
    return config;
  }

  const token = localStorage.getItem('token');

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  
  return config;
}, (error: Error) => {
  return Promise.reject(error);
});

export default defineBoot(({ app }) => {
  // for use inside Vue files (Options API) through this.$axios and this.$api

  app.config.globalProperties.$axios = axios;
  // ^ ^ ^ this will allow you to use this.$axios (for Vue Options API form)
  //       so you won't necessarily have to import axios in each vue file

  app.config.globalProperties.$api = api;
  // ^ ^ ^ this will allow you to use this.$api (for Vue Options API form)
  //       so you can easily perform requests against your app's API
});

export { api };
