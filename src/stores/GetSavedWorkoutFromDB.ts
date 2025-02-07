import { defineStore } from 'pinia';
import { DB_URL } from '@/config/DBurl';
import { computed, reactive, ref } from 'vue';

interface Workout {
  id: number;
  rate: number;
  sets: number;
  volume: number;
  reps: number;
  createdAt: string; 
}

interface StateData {
  data: {
    stats: Workout[]; 
  };
}

export const useSavedWorkout = defineStore('useSavedWorkout', () => {
  const state = reactive<StateData>({
    data: {
      stats: [], 
    }
  });

  const isLoading = ref<boolean>(false);
  const error = ref<string | null>(null);

  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  const fetchDBData = async (urlKey: keyof typeof DB_URL): Promise<void> => {
    const url = `${BACKEND_URL}/${DB_URL[urlKey]}`;
    isLoading.value = true;
    error.value = null;

    try {
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      state.data = await response.json();
    } catch (err: any) {
      error.value = err.message;
    } finally {
      isLoading.value = false;
    }
  };

  const getData = computed(() => state.data.stats);
  const getLoadingStatus = computed(() => isLoading.value);
  const getError = computed(() => error.value);

  return {
    state,
    isLoading,
    error,
    fetchDBData,
    getData,
    getLoadingStatus,
    getError,
  };
});
