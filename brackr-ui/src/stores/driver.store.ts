import { defineStore, acceptHMRUpdate } from 'pinia';
import { api } from 'src/boot/axios';

export interface TrackedObject {
  id: string;
  name: string;
  createdAt: string;
  companyId: string;
}

export interface Location {
  id: string;
  name: string;
  createdAt: string;
  latitude: string;
  longitude: string;
  companyId: string;
}

interface DriverStateModel {
    allTrackedObjects: TrackedObject[];
    allLocations: Location[];
    trackedObjLoading: boolean;
    locationsLoading: boolean;
    message: string;
    error?: boolean;
}

export const useDriverStore = defineStore('driver', {
  state: () => ({
    allTrackedObjects: [],
    allLocations: [],
    trackedObjLoading: false,
    locationsLoading: false,
    message: '',
    error: false,
  } as DriverStateModel),

  getters: {
    trackedObjects: (state) => state.allTrackedObjects,
    locations: (state) => state.allLocations,
    gtrackedObjLoading: (state) => state.trackedObjLoading,
    glocationsLoading: (state) => state.locationsLoading,
    gmessage: (state) => state.message,
  },

  actions: {
    async fetchTrackedObjects() {
      this.trackedObjLoading = true;
      try {
        const { data } = await api('/location/object/all');
        
        this.allTrackedObjects = await data.response

      } catch (error) {
        console.error('Failed to fetch tracked objects:', error);
        this.error = true;
        this.message = 'Failed to load tracked objects';
      } finally {
        this.trackedObjLoading = false;
      }
    },
    async fetchLocations() {
      this.locationsLoading = true;
      try {
        const { data } = await api('/location/all');
        
        this.allLocations = await data.response

      } catch (error) {
        console.error('Failed to fetch locations:', error);
        this.error = true;
        this.message = 'Failed to load locations';
      } finally {
        this.locationsLoading = false;
      }
    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useDriverStore, import.meta.hot));
}
