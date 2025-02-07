import { defineStore } from 'pinia';
import { DB_URL } from '@/config/DBurl';
import { computed, reactive, ref } from 'vue';

type Exercise = {
  id: number;
  bodyPart: string;
  equipment: string;
  name: string;
  image: string;
  instructions: string[];
  secondaryMuscles: string[];
  target: string;
};

type Routine = {
  id: number;
  name: string;
  exercises: Exercise[];
};

interface StateData {
  data: {
    routines: Routine[]; 
  };
}

export const useRoutine = defineStore('useRoutine', () => {
  const state = reactive<StateData>({
    data: {
      routines: [], 
    },
  });

  const isLoading = ref<boolean>(false);
  const error = ref<string | null>(null);
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  const fetchDBData = async (urlKey: keyof typeof DB_URL): Promise<void> => {
    const url = `${BACKEND_URL}${DB_URL[urlKey]}`;
    isLoading.value = true;
    error.value = null;

    try {
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      state.data = data; 
    } catch (err: any) {
      error.value = err.message;
    } finally {
      isLoading.value = false;
    }
  };

  const getData = computed(() => state.data);
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
