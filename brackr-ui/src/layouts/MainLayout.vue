<template>
  <q-layout view="lHh Lpr lFf">
    <div class="floating-navbar">
      <div class="header-logo-title">
        <q-icon name="directions_bus" size="28px" color="primary" class="header-bus-icon" />
        <span class="header-title">Brackr</span>
      </div>
      <q-input
        class="navbar-search"
        dense
        outlined
        rounded
        placeholder="Search for a bus, stop, or route..."
        v-model="search"
        :clearable="true"
        color="primary"
        bg-color="white"
        prepend-inner-icon="search"
      />
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

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
    >
      <q-list>
        <q-item-label header>
          <div class="header-logo-title">
            <q-icon name="directions_bus" size="28px" color="primary" class="header-bus-icon" />
            <span class="header-title">Brackr</span>
          </div>
        </q-item-label>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { ref } from 'vue';
// import { useRouter } from 'vue-router';

// const router = useRouter()
const leftDrawerOpen = ref(false);
const search = ref('');

function toggleLeftDrawer () {
  leftDrawerOpen.value = !leftDrawerOpen.value;
}
</script>

<style scoped>
.floating-navbar {
  position: fixed;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1100;
  background: rgba(255,255,255,0.95);
  box-shadow: 0 4px 24px 0 rgba(31, 38, 135, 0.13);
  border-radius: 20px;
  padding: 1.2rem 2.2rem 1.2rem 2.2rem;
  min-width: 340px;
  max-width: 96vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.7rem;
}

.header-logo-title {
  display: flex;
  align-items: center;
  gap: 8px;
  justify-content: center;
  margin-bottom: 0.2rem;
}

.header-bus-icon {
  margin-right: 2px;
}

.header-title {
  font-size: 1rem;
  font-weight: 700;
  color: #1976d2;
  letter-spacing: 2px;
}

.navbar-search {
  width: 260px;
  max-width: 80vw;
  margin-bottom: 0.2rem;
}

.navbar-menu-btn {
  position: absolute;
  top: 12px;
  right: 18px;
}
</style>
