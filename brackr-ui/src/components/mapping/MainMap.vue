<template>
  <div class="map-container">
    <l-map
      :zoom="zoom"
      :center="center as [number, number]"
      style="height: 100%; width: 100%;"
    >
      <l-tile-layer
        :url="tileUrl"
        :attribution="attribution"
      />
      <!-- Example marker -->
      <l-marker :lat-lng="center">
        <l-popup>You are here</l-popup>
      </l-marker>
    </l-map>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { LMap, LTileLayer, LMarker, LPopup } from '@vue-leaflet/vue-leaflet'
import 'leaflet/dist/leaflet.css'

import type { LatLngTuple } from 'leaflet'

const zoom = ref(13)
const center = ref<LatLngTuple>([ -26.2041, 28.0473 ]) // Johannesburg as example

const tileUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
const attribution = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
</script>

<style scoped>
.map-container {
  width: 100vw;
  height: 100vh;
  min-height: 100dvh;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1;
  border-radius: 0;
  overflow: hidden;
}
</style>