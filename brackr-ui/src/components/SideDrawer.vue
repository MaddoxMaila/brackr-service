<template>
     <q-drawer
      v-model="modelValue"
      show-if-above
      bordered
    >
      <q-list class="custom-drawer-list">
        <q-item-label header>
          <div class="header-logo-title">
            <q-icon name="directions_bus" size="28px" color="primary" class="header-bus-icon" />
            <span class="header-title">Brackr</span>
          </div>
        </q-item-label>

        <q-item clickable v-ripple to="/" exact class="menu-item">
          <q-item-section avatar>
            <q-icon name="home" />
          </q-item-section>
          <q-item-section class="item-text">Home</q-item-section>
        </q-item>

        <q-item
          clickable
          v-ripple
          @click="() => {
            useAuth.logout(); 
            if(!useAuth.user){
            router.push('/login')
          }}"
          exact
          class="menu-item logout-item"
        >
          <q-item-section avatar>
            <q-icon name="logout" color="negative" />
          </q-item-section>
          <q-item-section class="item-text logout-text">Logout</q-item-section>
        </q-item>
      </q-list>
    </q-drawer>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { useAuthStore } from 'src/stores/auth.store';
import { useRouter } from 'vue-router'; 

const props = defineProps<{
  leftDrawerOpen: boolean;
}>();
const emit = defineEmits(['update:leftDrawerOpen']);

const modelValue = computed({
  get: () => props.leftDrawerOpen,
  set: (val: boolean) => emit('update:leftDrawerOpen', val)
});

const router = useRouter();
const useAuth = useAuthStore(); 
</script>
<style scoped>

.custom-drawer-list {
  padding: 1.2rem 0.5rem 1.2rem 0.5rem;
  background: linear-gradient(135deg, #f5fafd 60%, #e3f2fd 100%);
  border-radius: 18px 0 0 18px;
  min-height: 100vh;
  box-shadow: 2px 0 16px 0 rgba(38, 166, 154, 0.06);
}

.q-item-label[header] {
  margin-bottom: 1.2rem;
  padding-bottom: 0.7rem;
  border-bottom: 1px solid #e3e8f0;
  display: flex;
  justify-content: center;
}

.item-text {
  font-size: 1rem;
  font-weight: 500;
  color: inherit;
}

.menu-item {
  border-radius: 12px;
  margin: 0.3rem 0.5rem;
  transition: all 0.2s;
  background: transparent;
  box-shadow: none;
  font-size: 1.05rem;
  font-weight: 500;
  color: #1976d2;

  &:hover {
    background: #e3f2fd;
    color: #1976d2;
    box-shadow: 0 2px 8px 0 rgba(38, 166, 154, 0.08);
  }

  &.q-router-link-exact-active {
    background: linear-gradient(90deg, #1976d2 0%, #26a69a 100%);
    color: #fff;

    .q-icon {
      color: #fff;
    }
  }
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


/* Logout specific styling */
.logout-item {
  color: #c62828 !important;
  transition: background 0.2s, color 0.2s;
}
.logout-item .q-icon {
  color: #c62828 !important;
}
.logout-item .logout-text {
  color: #c62828 !important;
}
.logout-item:hover,
.logout-item:focus {
  background: #ffebee !important;
  color: #c62828 !important;
}
.logout-item:hover .q-icon,
.logout-item:focus .q-icon,
.logout-item:hover .logout-text,
.logout-item:focus .logout-text {
  color: #b71c1c !important;
}

.q-item-section[avatar] .q-icon {
  font-size: 1.3rem;
}


</style>
