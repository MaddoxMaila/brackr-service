<template>
  <router-view />
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useAuthStore } from './stores/auth.store';
import { useRouter } from 'vue-router';

const useAuth = useAuthStore();
const router = useRouter();

onMounted(async () => {
  if (!useAuth.authUser) {
    useAuth.loadUserFromLocalStorage();
  }
  await router.push(useAuth.authUser?.type === 'driver' ? '/driver' : '/');
});

</script>
