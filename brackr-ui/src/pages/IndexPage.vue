<template>
  <main-map v-if="useAuth.authUser?.type === 'user'"></main-map>
  <add-item-tracker v-else-if="useAuth.authUser?.type === 'driver'"></add-item-tracker>
</template>

<script setup lang="ts">
import MainMap from 'src/components/mapping/MainMap.vue';
import AddItemTracker from 'src/pages/driver/AddItemTrackerPage.vue';
import { useAuthStore } from 'src/stores/auth.store';

const useAuth = useAuthStore();


</script>
