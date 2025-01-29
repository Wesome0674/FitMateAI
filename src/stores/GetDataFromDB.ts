import { ref, computed } from 'vue';
import { defineStore } from 'pinia';

type User = {
  id: number;
  name: string;
  email: string;
};

type ApiResponse = {
  users: User[];
};

export const useDbData = defineStore('getDbData', () => {
  const data = ref<ApiResponse | null>(null); 
  const isLoading = ref<boolean>(false);
  const error = ref<string | null>(null);

  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  const fetchData = async () => {
    isLoading.value = true;
    error.value = null;

    try {
      const response = await fetch(BACKEND_URL);

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const jsonData: ApiResponse = await response.json(); 
      data.value = jsonData;
    } catch (err: any) {
      error.value = err.message;
    } finally {
      isLoading.value = false;
    }
  };

  const getData = computed(() => data.value); 
  const getUsers = computed(() => data.value?.users || []);
  const getLoadingStatus = computed(() => isLoading.value);
  const getError = computed(() => error.value);

  return {
    data,
    isLoading,
    error,
    fetchData,
    getData,
    getUsers,
    getLoadingStatus,
    getError,
  };
});
