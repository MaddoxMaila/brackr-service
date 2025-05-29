<template>
  <div class="tracker-glass-bg">
    <q-card class="tracker-form-card-glass full-card">
      <q-card-section class="full-card-section">
        <div class="form-title-glass">
          <q-icon name="add_location_alt" color="primary" size="md" class="form-title-icon" />
          Track a Bus Journey
        </div>
        <q-form @submit="onSubmit" class="q-gutter-md">
          <div v-if="!busName">
            <div class="bus-grid-title">Choose a Bus</div>
            <q-input
              v-model="busSearch"
              dense
              outlined
              rounded
              clearable
              placeholder="Search bus name..."
              class="bus-search-input"
              prepend-inner-icon="search"
              bg-color="white"
            />
            <div class="bus-grid-scroll glass-grid-bg">
              <template v-if="useDriver.gtrackedObjLoading">
                <div
                  v-for="n in 8"
                  :key="n"
                  class="bus-grid-btn skeleton shimmer"
                  style="height:64px;"
                ></div>
              </template>
              <template v-else>
                <q-btn
                  v-for="bus in filteredBusOptions"
                  :key="bus.name"
                  class="bus-grid-btn glass-btn"
                  :label="bus.name"
                  @click="selectBus(bus.name)"
                  unelevated
                  rounded
                  :icon="'directions_bus'"
                />
              </template>
            </div>
          </div>
          <div v-else>
            <div class="selected-bus-row">
              <q-btn
                flat
                dense
                ripple
                icon="arrow_back"
                color="primary"
                class="back-btn"
                @click="busName = ''"
              />
              <q-chip color="primary" text-color="white" icon="directions_bus">
                {{ busName }}
              </q-chip>
            </div>
            <q-select
              v-model="fromLocation"
              :options="locationOptions"
              label="From"
              dense
              outlined
              rounded
              color="primary"
              bg-color="white"
              :rules="[(val: string) => !!val || 'Please select a starting location']"
              class="tracker-input-glass"
              use-input
              input-debounce="0"
              fill-input
              clearable
              prefix="📍"
            />
            <q-select
              v-model="toLocation"
              :options="locationOptions"
              label="To"
              dense
              outlined
              rounded
              color="primary"
              bg-color="white"
              :rules="[(val: string) => !!val || 'Please select a destination']"
              class="tracker-input-glass"
              use-input
              input-debounce="0"
              fill-input
              clearable
              prefix="🏁"
            />
            <q-btn
              label="Track"
              class="gradient-btn-glass"
              unelevated
              type="submit"
              :loading="false"
              no-caps
              size="lg"
              icon="radar"
            />
          </div>
        </q-form>
      </q-card-section>
    </q-card>
  </div>
</template>

<script setup lang="ts">
import { useDriverStore } from 'src/stores/driver.store';
import { onMounted } from 'vue';
import { ref, computed } from 'vue';

const useDriver = useDriverStore();

const busName = ref('');
const fromLocation = ref('');
const toLocation = ref('');
const busSearch = ref('');

const filteredBusOptions = computed(() => {
  if(!useDriver.trackedObjects) return [] as { name: string }[];
  if(useDriver.trackedObjects.length === 0) return [] as { name: string }[];
  return useDriver.trackedObjects.filter(bus =>
    bus.name.toLowerCase().includes(busSearch.value.trim().toLowerCase())
  )
});

const locationOptions = computed(() => useDriver.locations.map(location => location.name));

function selectBus(bus: string) {
  busName.value = bus;
}

function onSubmit() {
  setTimeout(() => {
    alert(`Tracking ${busName.value} from ${fromLocation.value} to ${toLocation.value}`);
  }, 1200);
}

onMounted(async () => {
  if (useDriver.trackedObjects && useDriver.locations) {
    await useDriver.fetchTrackedObjects();
    await useDriver.fetchLocations();
  }
});
</script>

<style scoped lang="scss">
.tracker-glass-bg {
  min-height: 100vh;
  width: 100vw;
  background: white;//linear-gradient(135deg, #e3f2fd 0%, #f5fafd 100%);
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: stretch;
  padding: 0;
}

.full-card {
  min-height: 100vh;
  min-width: 100vw;
  max-width: 100vw;
  border-radius: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.full-card-section {
  flex: 1 1 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-height: 100vh;
  padding: 2.5rem 1.2rem 2.5rem 1.2rem;
}

.tracker-form-card-glass {
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.13);
  background: rgba(255,255,255,0.65);
  backdrop-filter: blur(12px);
  border: 1.5px solid rgba(25, 118, 210, 0.08);
}

.form-title-glass {
  font-size: 1.25rem;
  font-weight: 600;
  color: #1976d2;
  margin-bottom: 1.2rem;
  text-align: center;
  letter-spacing: 1px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
}

.form-title-icon {
  margin-bottom: 2px;
}

.bus-grid-title {
  font-size: 1.1rem;
  font-weight: 500;
  color: #1976d2;
  margin-bottom: 0.7rem;
  text-align: center;
  letter-spacing: 1px;
}

.bus-search-input {
  margin-bottom: 1rem;
  max-width: 350px;
  margin-left: auto;
  margin-right: auto;
  display: block;
}

.bus-grid-scroll {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  gap: 1.1rem;
  max-height: 400px;
  overflow-y: auto;
  padding-bottom: 0.2rem;
  margin-bottom: 1.2rem;
  width: 100%;
}

.glass-grid-bg {
  background: rgba(255,255,255,0.18);
  border-radius: 20px;
  box-shadow: 0 4px 24px 0 rgba(31, 38, 135, 0.10);
  backdrop-filter: blur(10px);
  padding: 1.2rem 0.7rem;
}

.bus-grid-btn {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 1.08rem;
  font-weight: 700;
  border-radius: 10px;
  background: rgba(255,255,255,0.38);
  color: #1976d2 !important;
  box-shadow: 0 2px 2px 0 rgba(38, 166, 154, 0.13);
  border: 2px solid rgba(25, 118, 210, 0.13);
  transition: 
    box-shadow 0.2s, 
    filter 0.2s, 
    background 0.2s, 
    border-color 0.2s, 
    color 0.2s, 
    transform 0.15s;
  width: 100%;
  min-width: 0;
  min-height: 64px;
  letter-spacing: 1.2px;
  backdrop-filter: blur(8px);
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.bus-grid-btn .q-icon {
  font-size: 2rem;
  margin-bottom: 0.2rem;
  color: #26a69a;
  filter: drop-shadow(0 2px 6px rgba(38, 166, 154, 0.15));
  transition: color 0.2s;
}

.bus-grid-btn:hover, .bus-grid-btn:focus {
  filter: brightness(1.09);
  background: linear-gradient(90deg, #1976d2 0%, #26a69a 100%);
  color: #fff !important;
  border-color: #1976d2;
  box-shadow: 0 6px 24px 0 rgba(38, 166, 154, 0.18);
  transform: translateY(-2px) scale(1.03);
}

.bus-grid-btn:hover .q-icon,
.bus-grid-btn:focus .q-icon {
  color: #fff;
}

.bus-grid-btn::after {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: 18px;
  background: linear-gradient(120deg, rgba(25,118,210,0.08) 0%, rgba(38,166,154,0.08) 100%);
  opacity: 0.7;
  pointer-events: none;
  z-index: 0;
}

.selected-bus-row {
  display: flex;
  align-items: center;
  gap: 0.7rem;
  margin-bottom: 1.1rem;
}

.back-btn {
  margin-right: 0.2rem;
}

.tracker-input-glass {
  width: 100%;
  background: rgba(255,255,255,0.7);
  border-radius: 12px;
  box-shadow: 0 1px 4px 0 rgba(38, 166, 154, 0.07);
}

.gradient-btn-glass {
  background: linear-gradient(90deg, #1976d2 0%, #26a69a 100%);
  color: #fff !important;
  border-radius: 14px;
  font-weight: 600;
  font-size: 1.1rem;
  box-shadow: 0 2px 8px 0 rgba(38, 166, 154, 0.12);
  transition: box-shadow 0.2s, filter 0.2s;
  width: 100%;
  margin-top: 0.5rem;
  letter-spacing: 1px;
}
.gradient-btn-glass:hover, .gradient-btn-glass:focus {
  box-shadow: 0 4px 16px 0 rgba(38, 166, 154, 0.18);
  filter: brightness(1.07);
}

.skeleton {
  background: #e0e3ea;
  border-radius: 10px;
  min-height: 64px;
  width: 100%;
  margin-bottom: 0;
  position: relative;
  overflow: hidden;
}

.shimmer {
  animation: shimmer 1.2s infinite linear;
  background: linear-gradient(
    90deg,
    #e0e3ea 0%,
    #f5fafd 40%,
    #e0e3ea 80%
  );
  background-size: 200% 100%;
}

@keyframes shimmer {
  0% {
    background-position: -200% 0;
  }
  100% {
    background-position: 200% 0;
  }
}
</style>
