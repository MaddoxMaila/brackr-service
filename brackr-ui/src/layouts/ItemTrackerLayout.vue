<template>
  <q-layout view="lHh Lpr lFf">
    <div class="tracker-glass-floating">
      <div class="tracker-logo-float">
        <div class="circle-bus-float">
          <q-icon name="directions_bus" size="28px" color="white" />
        </div>
        <span class="tracker-title-float">Brackr</span>
      </div>
      <q-btn
        flat
        dense
        round
        icon="menu"
        aria-label="Menu"
        color="primary"
        class="navbar-menu-btn"
        @click="toggleLeftDrawer"
      />
    </div>

    <side-drawer v-model:leftDrawerOpen="leftDrawerOpen" />

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import SideDrawer from 'src/components/SideDrawer.vue';

const leftDrawerOpen = ref(false);

function toggleLeftDrawer () {
  leftDrawerOpen.value = !leftDrawerOpen.value;
}
</script>

<style scoped>
.tracker-glass-floating {
  position: fixed;
  top: 10px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1200;
  display: flex;
  align-items: center;
  gap: 18px;
  background: rgba(255,255,255,0.45);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.13);
  border-radius: 22px;
  padding: 0.7rem 2.2rem 0.7rem 1.5rem;
  backdrop-filter: blur(14px);
  border: 1.5px solid rgba(25, 118, 210, 0.10);
  transition: background 0.3s, box-shadow 0.3s;
  min-width: 220px;
  max-width: 90vw;
}

.tracker-logo-float {
  display: flex;
  align-items: center;
  gap: 12px;
}

.circle-bus-float {
  background: linear-gradient(135deg, #1976d2 60%, #26a69a 100%);
  border-radius: 50%;
  width: 42px;
  height: 42px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 8px 0 rgba(38, 166, 154, 0.13);
}

.tracker-title-float {
  font-size: 1.3rem;
  font-weight: 700;
  color: #1976d2;
  letter-spacing: 2px;
  text-shadow: 0 2px 8px rgba(38, 166, 154, 0.08);
}

.navbar-menu-btn {
  margin-left: 1.2rem;
}
</style>
